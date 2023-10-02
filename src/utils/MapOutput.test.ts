import { generateNumberRegex } from './MapOutput';

describe('testing index file', () => {
    const sampleSize = 199;

    test('Should match correct quantities without optimization', () => {
        arrayRange(sampleSize).map(i => i + 1).forEach(selectedValue => {
            const shouldNotMatch = arrayRange(selectedValue);
            const shouldMatch = arrayRange(sampleSize - selectedValue + 1).map(i => selectedValue + i);
            shouldNotMatch.map(noMatch => {
                const regex = generateNumberRegex(`${selectedValue}`, false);
                const r = new RegExp(regex);
                expect(r.test(`${noMatch}%`)).toBe(false);
            });

            shouldMatch.map(match => {
                const regex = generateNumberRegex(`${selectedValue}`, false);
                const r = new RegExp(regex);
                // console.log(`r: ${r}, m: ${match} -> s: ${selectedValue}`);
                expect(r.test(`${match}%`)).toBe(true);
            });
        })
    });

    test('Should match correct quantities with optimization', () => {
        arrayRange(sampleSize).map(i => i + 1).forEach(sv => {
            const selectedValue = Math.floor(sv / 10) * 10;
            const shouldNotMatch = arrayRange(selectedValue);
            const shouldMatch = arrayRange(sampleSize - selectedValue + 1).map(i => selectedValue + i);
            shouldNotMatch.map(noMatch => {
                const regex = generateNumberRegex(`${selectedValue}`, true);
                const r = new RegExp(regex);
                expect(r.test(`${noMatch}%`)).toBe(false);
            });

            shouldMatch.map(match => {
                const regex = generateNumberRegex(`${selectedValue}`, true);
                const r = new RegExp(regex);
                expect(r.test(`${match}%`)).toBe(true);
            });
        })
    });
});

const arrayRange = (size: number) => Array(size).fill(0).map((_, i) => i);