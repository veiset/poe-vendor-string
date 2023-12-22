import {generateMapModStr} from './MapOutput';
import {MapSettings} from "./SavedSettings";

describe('testing quantity and quality regex number matching', () => {
  const sampleSize = 199;

  const settings = (quant: string, optimize: boolean): MapSettings => ({
    badMods: [],
    goodMods: [],
    kirac: [],
    allGoodMods: false,
    optimizePacksize: optimize,
    optimizeQuant: optimize,
    quantity: quant,
    packsize: "",
    rarity: {normal: true, magic: true, rare: true}
  })

  test('Should match correct quantities without optimization', () => {
    arrayRange(sampleSize).map(i => i + 1).forEach(selectedValue => {
      const shouldNotMatch = arrayRange(selectedValue);
      const shouldMatch = arrayRange(sampleSize - selectedValue + 1).map(i => selectedValue + i);
      shouldNotMatch.map(noMatch => {
        const regex = generateMapModStr(settings(`${selectedValue}`, false)).replaceAll("\"", "");
        const r = new RegExp(regex);
        const mapText = `map quantity: ${noMatch}%`;
        // console.log(`r: ${r}, map: "${mapText}" matching: ${noMatch} -> selected: ${selectedValue}`);
        expect(r.test(mapText)).toBe(false);
      });

      shouldMatch.map(match => {
        const regex = generateMapModStr(settings(`${selectedValue}`, false)).replaceAll("\"", "");
        const r = new RegExp(regex);
        const mapText = `map quantity: ${match}%`;
        // console.log(`r: ${r}, map: "${mapText}" matching: ${match} -> selected: ${selectedValue}`);
        expect(r.test(mapText)).toBe(true);
      });
    })
  });

  test('Should match correct quantities with optimization', () => {
    arrayRange(sampleSize).map(i => i + 1).forEach(sv => {
      const selectedValue = Math.floor(sv / 10) * 10;
      const shouldNotMatch = arrayRange(selectedValue);
      const shouldMatch = arrayRange(sampleSize - selectedValue + 1).map(i => selectedValue + i);
      shouldNotMatch.map(noMatch => {
        const regex = generateMapModStr(settings(`${selectedValue}`, true)).replaceAll("\"", "");
        const r = new RegExp(regex);
        expect(r.test(`map quantity: ${noMatch}%`)).toBe(false);
      });

      shouldMatch.map(match => {
        const regex = generateMapModStr(settings(`${selectedValue}`, true)).replaceAll("\"", "");
        const r = new RegExp(regex);
        expect(r.test(`map quantity: ${match}%`)).toBe(true);
      });
    })
  });
});

const arrayRange = (size: number) => Array(size).fill(0).map((_, i) => i);