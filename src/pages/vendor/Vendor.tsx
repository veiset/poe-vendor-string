import React, {Dispatch, SetStateAction, useContext, useEffect} from 'react';
import './Vendor.css';
import socketRed from '../../img/red-socket.png';
import socketGreen from '../../img/green-socket.png';
import socketBlue from '../../img/blue-socket.png';
import socketAny from '../../img/any-socket.png';
import socketLink from '../../img/link.png';

import {generateResultString, generateWarnings} from "../../utils/OutputString";
import ResultBox from "../../components/ResultBox";
import Header from "../../components/Header";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import {VendorSettings} from "../../utils/SavedSettings";
import {ProfileContext} from "../../components/profile/ProfileContext";


const Vendor = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);

  const [result, setResult] = React.useState("");
  const [warning, setWarning] = React.useState<string | undefined>();

  const [rrr, setRrr] = React.useState(profile.vendor.colors.rrr);
  const [ggg, setGgg] = React.useState(profile.vendor.colors.ggg);
  const [bbb, setBbb] = React.useState(profile.vendor.colors.bbb);

  const [rrA, setRrA] = React.useState(profile.vendor.colors.rrA);
  const [ggA, setGgA] = React.useState(profile.vendor.colors.ggA);
  const [bbA, setBbA] = React.useState(profile.vendor.colors.bbA);

  const [rrg, setRrg] = React.useState(profile.vendor.colors.rrg);
  const [rrb, setRrb] = React.useState(profile.vendor.colors.rrb);
  const [ggr, setGgr] = React.useState(profile.vendor.colors.ggr);
  const [ggb, setGgb] = React.useState(profile.vendor.colors.ggb);
  const [bbr, setBbr] = React.useState(profile.vendor.colors.bbr);
  const [bbg, setBbg] = React.useState(profile.vendor.colors.bbg);

  const [rgb, setRgb] = React.useState(profile.vendor.colors.rgb);

  const [raa, setRaa] = React.useState(profile.vendor.colors.raa);
  const [gaa, setGaa] = React.useState(profile.vendor.colors.gaa);
  const [baa, setBaa] = React.useState(profile.vendor.colors.baa);

  const [rr, setRr] = React.useState(profile.vendor.colors.rr);
  const [gg, setGg] = React.useState(profile.vendor.colors.gg);
  const [bb, setBb] = React.useState(profile.vendor.colors.bb);

  const [rb, setRb] = React.useState(profile.vendor.colors.rb);
  const [gr, setGr] = React.useState(profile.vendor.colors.gr);
  const [bg, setBg] = React.useState(profile.vendor.colors.bg);

  const [specLink, setSpecLink] = React.useState(profile.vendor.colors.specLink);
  const [specLinkColorsR, setSpecLinkColorsR] = React.useState<number | undefined>(profile.vendor.colors.specLinkColors.r);
  const [specLinkColorsG, setSpecLinkColorsG] = React.useState<number | undefined>(profile.vendor.colors.specLinkColors.g);
  const [specLinkColorsB, setSpecLinkColorsB] = React.useState<number | undefined>(profile.vendor.colors.specLinkColors.b);

  const [anyThreeLink, setAnyThreeLink] = React.useState(profile.vendor.anyThreeLink);
  const [anyFourLink, setAnyFourLink] = React.useState(profile.vendor.anyFourLink);
  const [anyFiveLink, setAnyFiveLink] = React.useState(profile.vendor.anyFiveLink);
  const [anySixLink, setAnySixLink] = React.useState(profile.vendor.anySixLink);
  const [anySixSocket, setAnySixSocket] = React.useState(profile.vendor.anySixSocket);
  const [movement10, setMovement10] = React.useState(profile.vendor.movement.ten);
  const [movement15, setMovement15] = React.useState(profile.vendor.movement.fifteen);

  const [lightning, setLightning] = React.useState(profile.vendor.plusGems.lightning);
  const [fire, setFire] = React.useState(profile.vendor.plusGems.fire);
  const [cold, setCold] = React.useState(profile.vendor.plusGems.cold);
  const [phys, setPhys] = React.useState(profile.vendor.plusGems.phys);
  const [chaos, setChaos] = React.useState(profile.vendor.plusGems.chaos);
  const [anyGem, setAnyGem] = React.useState(profile.vendor.plusGems.any);

  const [dmgPhys, setDmgPhys] = React.useState(profile.vendor.damage.phys);
  const [fireMult, setFireMult] = React.useState(profile.vendor.damage.firemult);
  const [coldMult, setColdMult] = React.useState(profile.vendor.damage.coldmult);
  const [chaosMult, setChaosMult] = React.useState(profile.vendor.damage.chaosmult);

  // weapons
  const [weaponSceptre, setWeaponSceptre] = React.useState(profile.vendor.weapon.sceptre);
  const [weaponMace, setWeaponMace] = React.useState(profile.vendor.weapon.mace);
  const [weaponAxe, setWeaponAxe] = React.useState(profile.vendor.weapon.axe);
  const [weaponSword, setWeaponSword] = React.useState(profile.vendor.weapon.sword);
  const [weaponBow, setWeaponBow] = React.useState(profile.vendor.weapon.bow);
  const [weaponClaw, setWeaponClaw] = React.useState(profile.vendor.weapon.claw);
  const [weaponDagger, setWeaponDagger] = React.useState(profile.vendor.weapon.dagger);
  const [weaponStaff, setWeaponStaff] = React.useState(profile.vendor.weapon.staff);
  const [weaponWand, setWeaponWand] = React.useState(profile.vendor.weapon.wand);


  const listOfOptions = [
    setRrr, setGgg, setBbb,
    setRrA, setGgA, setBbA, setRrg, setRrb, setGgr, setGgb, setBbr, setBbg, setRgb, setRaa, setGaa, setBaa,
    setRr, setGg, setBb, setRb, setGr, setBg,
    setSpecLink,
    setAnyThreeLink, setAnyFourLink, setAnyFiveLink, setAnySixLink, setAnySixSocket,
    setMovement10, setMovement15, setLightning,
    setFire, setCold, setPhys, setChaos, setAnyGem,
    setDmgPhys, setFireMult, setColdMult, setChaosMult,
    setWeaponSceptre, setWeaponMace, setWeaponAxe, setWeaponSword, setWeaponBow, setWeaponClaw, setWeaponDagger, setWeaponStaff, setWeaponWand
  ]

  const listOfNumbers = [
    setSpecLinkColorsR, setSpecLinkColorsG, setSpecLinkColorsB,
  ]

  const listOfvalues = [
    rrr, ggg, bbb,
    rrA, ggA, bbA, rrg, rrb, ggr, ggb, bbr, bbg, rgb, raa, gaa, baa,
    rr, gg, bb, rb, gr, bg,
    specLink, specLinkColorsR, specLinkColorsG, specLinkColorsB,
    anyThreeLink, anyFourLink, anyFiveLink, anySixLink, anySixSocket,
    movement10, movement15, lightning,
    fire, cold, phys, chaos, anyGem,
    dmgPhys, fireMult, coldMult, chaosMult,
    weaponSceptre, weaponMace, weaponAxe, weaponSword, weaponBow, weaponClaw, weaponDagger, weaponStaff, weaponWand,
  ]

  let settings: VendorSettings = {
    anyThreeLink,
    anyFourLink,
    anyFiveLink,
    anySixLink,
    anySixSocket,
    movement: {
      ten: movement10,
      fifteen: movement15,
    },
    colors: {
      rrr, ggg, bbb,
      rrA, ggA, bbA,
      ggr, ggb, rrg, rrb, bbg, bbr,
      rgb, raa, gaa, baa,
      rr, gg, bb, rb, gr, bg,
      specLink,
      specLinkColors: {
        r: specLinkColorsR,
        g: specLinkColorsG,
        b: specLinkColorsB,
      }
    },
    plusGems: {
      lightning,
      fire,
      cold,
      phys,
      chaos,
      any: anyGem,
    },
    damage: {
      phys: dmgPhys,
      firemult: fireMult,
      coldmult: coldMult,
      chaosmult: chaosMult,
    },
    weapon: {
      sceptre: weaponSceptre,
      mace: weaponMace,
      axe: weaponAxe,
      sword: weaponSword,
      bow: weaponBow,
      claw: weaponClaw,
      dagger: weaponDagger,
      staff: weaponStaff,
      wand: weaponWand,
    }
  };

  useEffect(() => {
    saveSettings({
      ...profile,
      vendor: {
        ...settings
      },
    });
    setResult(generateResultString(settings));
    setWarning(generateWarnings(settings));
  }, listOfvalues)

  return (
    <>
      <Header text="Vendor"/>
      <div className="break"/>
      <ResultBox result={result} warning={warning} reset={() => {
        listOfOptions.forEach(setting => {
          setting(false);
        })
        listOfNumbers.forEach(settings => {
          settings(undefined);
        })
      }}/>
      <div className="break"/>
      <div className="vendor-wrapper">
        <div className="eq-col-3">
          <div className="column-header">Link colors (3L)</div>
          <SocketCheckbox label="r-r-*" value={rrA} onChange={setRrA}/>
          <SocketCheckbox label="g-g-*" value={ggA} onChange={setGgA}/>
          <SocketCheckbox label="b-b-*" value={bbA} onChange={setBbA}/>

          <SocketCheckbox className="small-padding" label="r-r-r" value={rrr} onChange={setRrr}/>
          <SocketCheckbox label="r-r-g" value={rrg} onChange={setRrg}/>
          <SocketCheckbox label="r-r-b" value={rrb} onChange={setRrb}/>

          <SocketCheckbox className="small-padding" label="g-g-g" value={ggg} onChange={setGgg}/>
          <SocketCheckbox label="g-g-r" value={ggr} onChange={setGgr}/>
          <SocketCheckbox label="g-g-b" value={ggb} onChange={setGgb}/>

          <SocketCheckbox className="small-padding" label="b-b-b" value={bbb} onChange={setBbb}/>
          <SocketCheckbox label="b-b-r" value={bbr} onChange={setBbr}/>
          <SocketCheckbox label="b-b-g" value={bbg} onChange={setBbg}/>

          <SocketCheckbox className="small-padding" label="r-g-b" value={rgb} onChange={setRgb}/>
          <SocketCheckbox label="r-*-*" value={raa} onChange={setRaa}/>
          <SocketCheckbox label="g-*-*" value={gaa} onChange={setGaa}/>
          <SocketCheckbox label="b-*-*" value={baa} onChange={setBaa}/>
        </div>
        <div className="eq-col-3">
          <div className="column-header small-padding"> Link colors (2L)</div>
          <SocketCheckbox label="r-r" value={rr} onChange={setRr}/>
          <SocketCheckbox label="g-g" value={gg} onChange={setGg}/>
          <SocketCheckbox label="b-b" value={bb} onChange={setBb}/>

          <SocketCheckbox className="small-padding" label="r-b" value={rb} onChange={setRb}/>
          <SocketCheckbox label="g-r" value={gr} onChange={setGr}/>
          <SocketCheckbox label="b-g" value={bg} onChange={setBg}/>

          <div className="column-header"> Any links</div>
          <SocketCheckbox label="" value={anyThreeLink} onChange={setAnyThreeLink} link="*-*-*"/>
          <SocketCheckbox label="" value={anyFourLink} onChange={setAnyFourLink} link="*-*-*-*"/>
          <SocketCheckbox label="" value={anyFiveLink} onChange={setAnyFiveLink} link="*-*-*-*-*"/>
          <Checkbox label="Any 6 link" value={anySixLink} onChange={setAnySixLink}/>
          <Checkbox label="Any 6 socket" value={anySixSocket} onChange={setAnySixSocket}/>

          <div className="column-header small-padding"> Other Links</div>
          <Checkbox label="Enable (Takes a lot of space)" value={specLink} onChange={setSpecLink}/>
          <div>
            <NumberInput label="r" value={specLinkColorsR} image="r" onChange={setSpecLinkColorsR}/>
            <NumberInput label="g" value={specLinkColorsG} image="g" onChange={setSpecLinkColorsG}/>
            <NumberInput label="b" value={specLinkColorsB} image="b" onChange={setSpecLinkColorsB}/>
          </div>
        </div>
        <div className="eq-col-3">
          <div className="column-header"> Movement speed</div>
          <Checkbox label="Movement speed (10%)" value={movement10} onChange={setMovement10}/>
          <Checkbox label="Movement speed (15%)" value={movement15} onChange={setMovement15}/>

          <div className="column-header">
            Misc
          </div>
          <Checkbox label="+1 wand (any)" value={anyGem} onChange={setAnyGem}/>
          <Checkbox label="+1 lightning wand" value={lightning} onChange={setLightning}/>
          <Checkbox label="+1 fire wand" value={fire} onChange={setFire}/>
          <Checkbox label="+1 cold wand" value={cold} onChange={setCold}/>
          <Checkbox label="+1 phys wand" value={phys} onChange={setPhys}/>
          <Checkbox label="+1 chaos wand" value={chaos} onChange={setChaos}/>

          <Checkbox className="small-padding" label="Physical damage" value={dmgPhys} onChange={setDmgPhys}/>
          <Checkbox label="Fire DOT multi" value={fireMult} onChange={setFireMult}/>
          <Checkbox label="Cold DOT multi" value={coldMult} onChange={setColdMult}/>
          <Checkbox label="Chaos DOT multi" value={chaosMult} onChange={setChaosMult}/>

          <div className="column-header">
            Weapon bases
          </div>
          <p className="warn-weapon">This will always highlight the selected weapon type, even if it doesn't match
            sockets, links or stats.</p>
          <div>
            <Checkbox className="float-left weapon-select" label="Axe" value={weaponAxe} onChange={setWeaponAxe}/>
            <Checkbox className="float-left weapon-select" label="Mace" value={weaponMace} onChange={setWeaponMace}/>
            <Checkbox className="float-left weapon-select" label="Sword" value={weaponSword} onChange={setWeaponSword}/>
          </div>
          <div>
            <Checkbox className="float-left weapon-select" label="Staff" value={weaponStaff} onChange={setWeaponStaff}/>
            <Checkbox className="float-left weapon-select" label="Sceptre" value={weaponSceptre}
                      onChange={setWeaponSceptre}/>
            <Checkbox className="float-left weapon-select" label="Claw" value={weaponClaw} onChange={setWeaponClaw}/>
          </div>
          <div>
            <Checkbox className="float-left weapon-select" label="Bow" value={weaponBow} onChange={setWeaponBow}/>
            <Checkbox className="float-left weapon-select" label="Wand" value={weaponWand} onChange={setWeaponWand}/>
            <Checkbox className="float-left weapon-select" label="Dagger" value={weaponDagger}
                      onChange={setWeaponDagger}/>
          </div>
        </div>
      </div>

      <div className="break"/>
    </>
  )
}


interface CheckboxProps {
  label: string
  value: boolean
  onChange: Dispatch<SetStateAction<boolean>>
  className?: string
}

interface LinkCheckboxProps {
  label: string
  link?: string
  value: boolean
  onChange: Dispatch<SetStateAction<boolean>>
  className?: string
}

interface NumberInputProps {
  label: string
  value: number | undefined
  image?: string
  onChange: Dispatch<SetStateAction<number | undefined>>
  className?: string
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <div className={props.className}>
      <label className="checkbox checkbox-text">
        <input className="checkbox-input" type="checkbox" checked={props.value}
               onChange={e => props.onChange(e.target.checked)}/>
        <span>{props.label}</span>
      </label>
    </div>
  );
}

const SocketCheckbox = (props: LinkCheckboxProps) => {
  const els = props.link?.split("") ?? props.label.split("");

  return (
    <div className={props.className}>
      <label className="checkbox">
        <input className="checkbox-input" type="checkbox" checked={props.value}
               onChange={e => props.onChange(e.target.checked)}/>
        {els.map((c, i) =>
          <img key={i} className="socket-size" src={imgFromChar(c)} alt="red"/>
        )}
        {props.label &&
            <span className="link-text">{props.label.replaceAll("-", "")}</span>
        }
      </label>
    </div>
  );
}

export const NumberInput = (props: NumberInputProps) => {
  return (
    <label className="numberinput">
      <input className="numberinput-input" placeholder="0" type="number" min="0" max="6" value={props.value}
             onChange={e => {
               const number = Number(e.target.value);
               number === 0 ? props.onChange(undefined) : props.onChange(number)
             }}/>
      {props.image ? <img className="socket-size" src={imgFromChar(props.image)} alt={props.image}/> : null}
      {props.label && <span>&nbsp;{props.label}</span>}
    </label>
  );
}

function imgFromChar(c: string) {
  switch (c) {
    case "r":
      return socketRed;
    case "g":
      return socketGreen;
    case "b":
      return socketBlue;
    case "-":
      return socketLink;
    default:
      return socketAny;
  }
}

export default Vendor;
