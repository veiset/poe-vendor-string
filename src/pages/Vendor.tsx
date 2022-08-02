import React, {Dispatch, SetStateAction, useEffect} from 'react';
import socketRed from '../img/red-socket.png';
import socketGreen from '../img/green-socket.png';
import socketBlue from '../img/blue-socket.png';
import socketAny from '../img/any-socket.png';
import socketLink from '../img/link.png';

import {generateResultString, PoeStringSettings} from "../utils/OutputString";
import ResultBox from "../components/ResultBox";
import Header from "../components/Header";
import {hasNKey} from "../utils/LocalStorage";

const Vendor = () => {

    const [result, setResult] = React.useState("")
    const savedSettings = JSON.parse(localStorage.getItem("vendorSearch") ?? "{}");
    console.log(savedSettings);

    const [rrr, setRrr] = React.useState(hasNKey(savedSettings, "colors.rrr"));
    const [ggg, setGgg] = React.useState(hasNKey(savedSettings, "colors.ggg"));
    const [bbb, setBbb] = React.useState(hasNKey(savedSettings, "colors.bbb"));

    const [rrA, setRrA] = React.useState(hasNKey(savedSettings, "colors.rrA"));
    const [ggA, setGgA] = React.useState(hasNKey(savedSettings, "colors.ggA"));
    const [bbA, setBbA] = React.useState(hasNKey(savedSettings, "colors.bbA"));

    const [rrg, setRrg] = React.useState(hasNKey(savedSettings, "colors.rrg"));
    const [rrb, setRrb] = React.useState(hasNKey(savedSettings, "colors.rrb"));
    const [ggr, setGgr] = React.useState(hasNKey(savedSettings, "colors.ggr"));
    const [ggb, setGgb] = React.useState(hasNKey(savedSettings, "colors.ggb"));
    const [bbr, setBbr] = React.useState(hasNKey(savedSettings, "colors.bbr"));
    const [bbg, setBbg] = React.useState(hasNKey(savedSettings, "colors.bbg"));

    const [rgb, setRgb] = React.useState(hasNKey(savedSettings, "colors.rgb"));

    const [raa, setRaa] = React.useState(hasNKey(savedSettings, "colors.raa"));
    const [gaa, setGaa] = React.useState(hasNKey(savedSettings, "colors.gaa"));
    const [baa, setBaa] = React.useState(hasNKey(savedSettings, "colors.baa"));

    const [rr, setRr] = React.useState(hasNKey(savedSettings, "colors.rr"));
    const [gg, setGg] = React.useState(hasNKey(savedSettings, "colors.gg"));
    const [bb, setBb] = React.useState(hasNKey(savedSettings, "colors.bb"));

    const [rb, setRb] = React.useState(hasNKey(savedSettings, "colors.rb"));
    const [gr, setGr] = React.useState(hasNKey(savedSettings, "colors.gr"));
    const [bg, setBg] = React.useState(hasNKey(savedSettings, "colors.bg"));

    const [anyThreeLink, setAnyThreeLink] = React.useState(hasNKey(savedSettings, "anyThreeLink"));
    const [anyFourLink, setAnyFourLink] = React.useState(hasNKey(savedSettings, "anyFourLink"));
    const [movement10, setMovement10] = React.useState(hasNKey(savedSettings, "movement.ten"));
    const [movement15, setMovement15] = React.useState(hasNKey(savedSettings, "movement.fifteen"));

    const [lightning, setLightning] = React.useState(hasNKey(savedSettings, "plusGems.lightning"));
    const [fire, setFire] = React.useState(hasNKey(savedSettings, "plusGems.fire"));
    const [cold, setCold] = React.useState(hasNKey(savedSettings, "plusGems.cold"));
    const [phys, setPhys] = React.useState(hasNKey(savedSettings, "plusGems.phys"));
    const [chaos, setChaos] = React.useState(hasNKey(savedSettings, "plusGems.chaos"));
    const [anyGem, setAnyGem] = React.useState(hasNKey(savedSettings, "plusGems.any"));

    const [dmgPhys, setDmgPhys] = React.useState(hasNKey(savedSettings, "damage.phys"));
    const [dmgElemental, setDmgElemental] = React.useState(hasNKey(savedSettings, "damage.elemental"));
    const [dmgSpellFlat, setDmgSpellFlat] = React.useState(hasNKey(savedSettings, "damage.spellFlat"));
    const [dmgSpell, setDmgSpell] = React.useState(hasNKey(savedSettings, "damage.spellDamage"));


    const listOfOptions = [
        setRrr, setGgg, setBbb,
        setRrA, setGgA, setBbA, setRrg, setRrb, setGgr, setGgb, setBbr, setBbg, setRgb, setRaa, setGaa, setBaa,
        setRr, setGg, setBb, setRb, setGr, setBg,
        setAnyThreeLink, setAnyFourLink,
        setMovement10, setMovement15, setLightning,
        setFire, setCold, setPhys, setChaos, setAnyGem,
        setDmgPhys, setDmgElemental, setDmgSpellFlat, setDmgSpell
    ]
    const listOfvalues = [
        rrr, ggg, bbb,
        rrA, ggA, bbA, rrg, rrb, ggr, ggb, bbr, bbg, rgb, raa, gaa, baa,
        rr, gg, bb, rb, gr, bg,
        anyThreeLink, anyFourLink,
        movement10, movement15, lightning,
        fire, cold, phys, chaos, anyGem,
        dmgPhys, dmgElemental, dmgSpellFlat, dmgSpell
    ]

    let settings: PoeStringSettings = {
        anyThreeLink,
        anyFourLink,
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
            elemental: dmgElemental,
            spellFlat: dmgSpellFlat,
            spellDamage: dmgSpell,
        }
    };

    useEffect(() => {
        localStorage.setItem("vendorSearch", JSON.stringify(settings));
        setResult(generateResultString(settings));
    }, listOfvalues)

    return (
        <div className="wrapper">
            <div className="container">
                <Header text={"Vendor Search"}/>
                <ResultBox result={result} reset={() => {
                    listOfOptions.forEach(setting => {
                        setting(false);
                    })
                }}/>
                <div className="break"/>
                <div className="item">
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
                <div className="item">
                    <div className="column-header"> Movement speed</div>
                    <Checkbox label="Movement speed (10%)" value={movement10} onChange={setMovement10}/>
                    <Checkbox label="Movement speed (15%)" value={movement15} onChange={setMovement15}/>

                    <div className="column-header"> Any links</div>
                    <SocketCheckbox label="Any 4 link" value={anyFourLink} onChange={setAnyFourLink} link="*-*-*-*"/>
                    <SocketCheckbox label="Any 3 link" value={anyThreeLink} onChange={setAnyThreeLink} link="*-*-*"/>

                    <div className="column-header small-padding"> Link colors (2L)</div>
                    <SocketCheckbox label="r-r" value={rr} onChange={setRr}/>
                    <SocketCheckbox label="g-g" value={gg} onChange={setGg}/>
                    <SocketCheckbox label="b-b" value={bb} onChange={setBb}/>

                    <SocketCheckbox className="small-padding" label="r-b" value={rb} onChange={setRb}/>
                    <SocketCheckbox label="g-r" value={gr} onChange={setGr}/>
                    <SocketCheckbox label="b-g" value={bg} onChange={setBg}/>
                </div>
                <div className="item">
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
                    <Checkbox label="Flat Elemental damage" value={dmgElemental} onChange={setDmgElemental}/>
                    <Checkbox label="Flat Spell damage" value={dmgSpellFlat} onChange={setDmgSpellFlat}/>
                    <Checkbox label="Increased Spell damage" value={dmgSpell} onChange={setDmgSpell}/>
                </div>

                <div className="break"/>

            </div>
        </div>
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

export const Checkbox = (props: CheckboxProps) => {
    return (
        <div className={props.className}>
            <label className="checkbox">
                <input className="checkbox-input" type="checkbox" checked={props.value} onChange={e => props.onChange(e.target.checked)}/>
                <span>{props.label}</span>
            </label>
        </div>
    );
}

const SocketCheckbox = (props: LinkCheckboxProps) => {
    const els = props.link ? props.link.split("") : props.label.split("");

    return (
        <div className={props.className}>
            <label className="checkbox">
                <input className="checkbox-input" type="checkbox" checked={props.value} onChange={e => props.onChange(e.target.checked)}/>
                {els.map(c =>
                    <img className="socket-size" src={imgFromChar(c)} alt="red"/>
                )}
                <span className="link-text">
                {props.label.replaceAll("-", "")}
                </span>
            </label>
        </div>
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
