import Header from "../../components/Header";
import React, {useContext, useEffect, useState} from "react";
import RegexResultBox from "../../components/RegexResultBox/RegexResultBox";
import {categories, defaultSettings, ItemSettings} from "../../utils/SavedSettings";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import Dropdown from "../../components/dropdown/Dropdown";
import {ItemAffixRegex, magicItemGroups, problemBases} from "../../generated/GeneratedMagicItem";
import GroupedTokenList, {GroupedTokens} from "../../components/GroupedTokenList/GroupedTokenList";
import Infobox from "../../components/infobox/Infobox";
import {generateMagicItemRegex} from "./MagicItemOutput";
import {Checkbox} from "../vendor/Vendor";
import "./MagicItem.css";

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

  const [synthItem, setSynthItem] = useState(profile.item.synthItem);
  const [matchAnyAffix, setMatchAnyAffix] = useState(profile.item.matchAnyAffix);
  const [matchOpenAffix, setMatchOpenAffix] = useState(profile.item.matchOpenAffix);
  const [customTextStr, setCustomTextStr] = useState(profile.item.customText.value);
  const [enableCustomText, setEnableCustomText] = useState(profile.item.customText.enabled);

  const [openPrefixWarning, setOpenPrefixWarning] = useState("");
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
    setOpenPrefixWarning(problemBases[itemType.modKey]?.join(", "));
  }, [matchOpenAffix, itemType]);

  useEffect(() => {
    const settings: ItemSettings = {
      synthItem,
      matchAnyAffix,
      matchOpenAffix,
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
    setResult(generateMagicItemRegex(settings))
  }, [itemType, itemCategory, selected, itemCategory, itemType, enableCustomText, customTextStr, synthItem, matchOpenAffix, matchAnyAffix]);

  function selectFn(key: string) {
    // clean up selected mods that might have been updated on the backend
    const cleanSelected = selected.filter((e) => {
      return modifiers.map((e) => e.regex).some(regex => regex === e.affix.regex);
    });

    const mod = modifiers.find((e) => e.description === key);
    const isSelected = cleanSelected.some((e) => e.itemType === itemType.name && e.affix.description === mod?.description);
    isSelected
      ? setSelected(cleanSelected.filter((e) => e.affix.description !== mod?.description))
      : setSelected(cleanSelected.concat({itemType: itemType.name, affix: mod!!}));
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
        setSynthItem(defaultSettings.item.synthItem);
        setMatchAnyAffix(defaultSettings.item.matchAnyAffix);
        setMatchOpenAffix(defaultSettings.item.matchOpenAffix);
        setEnableCustomText(defaultSettings.item.customText.enabled);
        setCustomTextStr(defaultSettings.item.customText.value);
        setSelected(selected.filter((e) => e.itemType !== itemType.name))
      }}
    />
    <Infobox
      header="Beta: might contain incorrect matches"
      text="
      Currently in early development so some features will be missing and it's not very well tested yet.;
      Please report any issues found (@vz / #tooldev-general at the poe discord, or as a github issue);;
      Currently not handling: Influenced items"
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
    <div className="full-size">
      <Checkbox label="Item has synthesized implicit"
                value={synthItem}
                onChange={setSynthItem}/>
      <Checkbox label="Match item if either prefix or suffix is found"
                value={matchAnyAffix}
                onChange={setMatchAnyAffix}/>
      {matchAnyAffix && matchOpenAffix && (
        <div className="open-affix-warning">
          <span className="bold">Warning! </span>
          Using this setting together with 'open prefix/suffix' will match an item as long as it has an open prefix/suffix.
        </div>)}
      <Checkbox label="Match item with open prefix/suffix"
                value={matchOpenAffix}
                onChange={setMatchOpenAffix}/>
      {matchOpenAffix && openPrefixWarning && (
        <div className="open-affix-warning">
          <span className="bold">Warning! </span>
          Cannot match open prefix/suffix on the following bases:<br/>
          <span className="bases bold">{openPrefixWarning}</span><br/>
          Disable this option if you're using on of those bases.
        </div>)
      }
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
      const generalizedName = affix.description
        .replaceAll(/\(\d+(\.\d+)?-\d+(\.\d+)?\)+/g, "#")
        .replaceAll(/\d+/g, "#");
      if (!acc[generalizedName]) {
        acc[generalizedName] = {groupName: generalizedName, tokens: []};
      }
      acc[generalizedName].tokens.push(affix.description);
      console.log(affix.description);
      return acc;
    }, {} as { [key: string]: GroupedTokens })
  );
}

export default MagicItem;