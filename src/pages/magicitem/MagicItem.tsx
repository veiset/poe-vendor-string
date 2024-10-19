import Header from "../../components/Header";
import React, {useContext, useEffect, useState} from "react";
import RegexResultBox from "../../components/RegexResultBox/RegexResultBox";
import {categories, defaultSettings, ItemSettings} from "../../utils/SavedSettings";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import Dropdown from "../../components/dropdown/Dropdown";
import {ItemAffixRegex, magicItemGroups} from "../../generated/GeneratedMagicItem";
import GroupedTokenList, {GroupedTokens} from "../../components/GroupedTokenList/GroupedTokenList";
import Infobox from "../../components/infobox/Infobox";

export interface ItemCategory {
  name: string
  itemType: MagicItemType[]
}

export interface MagicItemType {
  name: string
  modKey: string
}

export interface SelectedMod {
  itemType: string,
  affix: ItemAffixRegex
}

const MagicItem = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const [itemType, setItemType] = useState(profile.item.itemType);
  const [itemCategory, setItemCategory] = useState(profile.item.category);
  const [selected, setSelected] = useState<SelectedMod[]>(profile.item.selected);
  const [modifiers, setModifiers] = useState<ItemAffixRegex[]>(magicItemGroups[profile.item.itemType.modKey]);

  const [customTextStr, setCustomTextStr] = useState(profile.item.customText.value);
  const [enableCustomText, setEnableCustomText] = useState(profile.item.customText.enabled);

  const [result, setResult] = useState("");


  useEffect(() => {
    setModifiers(magicItemGroups[itemType.modKey]);
  }, [itemType]);

  useEffect(() => {
    const hasSubType = itemCategory.itemType.map((e) => e.name).some((e) => e === itemType.name)
    if (!hasSubType && itemCategory.itemType[0]) {
      setItemType(itemCategory.itemType[0]);
    }
  }, [itemCategory]);

  useEffect(() => {
    const settings: ItemSettings = {
      category: itemCategory,
      itemType: itemType,
      selected,
      customText: {
        value: customTextStr,
        enabled: enableCustomText,
      }
    }
    saveSettings({
      ...profile,
      item: {...settings},
    });
    setResult(selected
      .filter((e) => e.itemType === itemType.name)
      .map((e) => e.affix.regex)
      .join("|"));
  }, [itemType, itemCategory, selected, itemCategory, itemType, enableCustomText, customTextStr]);

  function selectFn(key: string) {
    const mod = modifiers.find((e) => e.description === key);
    const isSelected = selected.some((e) => e.itemType === itemType.name && e.affix.description === mod?.description);
    isSelected
      ? setSelected(selected.filter((e) => e.affix.description !== mod?.description))
      : setSelected(selected.concat({itemType: itemType.name, affix: mod!!}));
  }

  if (itemType === undefined) {
    return <></>
  }

  return (<>
    <Header text={"Magic Item Affix"}/>
    <RegexResultBox
      result={result}
      warning={undefined}
      customText={customTextStr}
      setCustomText={setCustomTextStr}
      enableCustomText={enableCustomText}
      setEnableCustomText={setEnableCustomText}
      reset={() => {
        setSelected([]);
        setEnableCustomText(defaultSettings.item.customText.enabled);
        setCustomTextStr(defaultSettings.item.customText.value);
        setSelected(selected.filter((e) => e.itemType !== itemType.name))
      }}
    />
    <Infobox
      header="Beta, incomplete features"
      text="
      Currently in early development so some features will be missing.;
      This is not very well tested yet, some mods might not highlight / some mods might highlight incorrect stuff.;
      Please report any issues found (@vz / #tooldev-general at the poe discord);;
      Currently not handling:;
      * Synth items;
      * Influenced items;
      * Open prefix/suffix"
    />
    <div className="full-size generic-top-element">
      <h2>Select item base</h2>
      <Dropdown
        elements={categories.map((e) => e.name)}
        selected={itemCategory.name}
        setSelected={(selected) => setItemCategory(categories.find((e) => e.name === selected)!!)}
        style={"dropdown-big"}
      />
      <Dropdown
        elements={itemCategory.itemType.map((e) => e.name)}
        selected={itemType.name}
        setSelected={(selected) => setItemType(itemCategory.itemType.find((e) => e.name === selected)!!)}
        style={"dropdown-big"}
      />
    </div>
    <div className="break"/>
    <div className="eq-col-2">
      <h2>Prefix</h2>
      <GroupedTokenList
        groups={modsToGroupedTokens(modifiers.filter((e) => e.isPrefix))}
        selected={selected.filter((e) => e.itemType === itemType.name).map((e) => e.affix.description)}
        setSelected={(key: string) => selectFn(key)}
      />
    </div>
    <div className="eq-col-2">
      <h2>Suffix</h2>
      <GroupedTokenList
        groups={modsToGroupedTokens(modifiers.filter((e) => !e.isPrefix))}
        selected={selected.filter((e) => e.itemType === itemType.name).map((e) => e.affix.description)}
        setSelected={(key: string) => selectFn(key)}
      />
    </div>
  </>);
}

function modsToGroupedTokens(modifiers: ItemAffixRegex[] | undefined): GroupedTokens[] {
  if (modifiers === undefined) return [];
  return Object.values(
    modifiers.reduce((acc, affix) => {
      if (!acc[affix.family]) {
        acc[affix.family] = {groupName: affix.family, tokens: []};
      }
      acc[affix.family].tokens.push(affix.description);
      return acc;
    }, {} as { [key: string]: GroupedTokens })
  ).map((e) => {
    const generalizedName = e.tokens[0]
      .replaceAll(/\(\d+(\.\d+)?-\d+(\.\d+)?\)+/g, "#")
      .replaceAll(/\d+/g, "#");
    return {groupName: generalizedName, tokens: e.tokens}
  });
}

export default MagicItem;