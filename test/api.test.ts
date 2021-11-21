import { expect } from "chai";

import { Zodiac } from "../code/types";

import { alfonsine, Input, Output } from "../code/api";


describe("API test", () => {
    const input: Input = {
        date_time: -15679518137,
        diff_hours: 0,
        diff_minutes: 0,
        east: true,
        accuracy: 10,
        epoch: "CHRIST",
        precession: "TREPIDATION"
    }

    describe("Should calculate models for all planets correctly", () => {
        const result: Output = {
            sun: {
                astronomic: { degrees: 340, minutes: 41 },
                astrologic: { degrees: 10, minutes: 41 },
                sign: Zodiac.PISCES,
                latitude: { degrees: 0, minutes: 0 },
                north: undefined
            },
            moon: {
                astronomic: { degrees: 246, minutes: 19 },
                astrologic: { degrees: 6, minutes: 19 },
                sign: Zodiac.SAGITTARIUS,
                latitude: { degrees: 1, minutes: 0 },
                north: true
            },
            mercury: {
                astronomic: { degrees: 0, minutes: 4 },
                astrologic: { degrees: 0, minutes: 4 },
                sign: Zodiac.ARIES,
                latitude: { degrees: 2, minutes: 43 },
                north: true
            },
            venus: {
                astronomic: { degrees: 8, minutes: 3 },
                astrologic: { degrees: 8, minutes: 3 },
                sign: Zodiac.ARIES,
                latitude: { degrees: 0, minutes: 55 },
                north: false
            },
            mars: {
                astronomic: { degrees: 322, minutes: 44 },
                astrologic: { degrees: 22, minutes: 44 },
                sign: Zodiac.AQUARIUS,
                latitude: { degrees: 0, minutes: 13 },
                north: false
            },
            jupiter: {
                astronomic: { degrees: 243, minutes: 23 },
                astrologic: { degrees: 3, minutes: 23 },
                sign: Zodiac.SAGITTARIUS,
                latitude: { degrees: 1, minutes: 15 },
                north: true
            },
            saturn: {
                astronomic: { degrees: 80, minutes: 11 },
                astrologic: { degrees: 20, minutes: 11 },
                sign: Zodiac.GEMINI,
                latitude: { degrees: 1, minutes: 9 },
                north: false
            }
        }

        it(`Alfonsine with input ${JSON.stringify(input)} should be equal to ${JSON.stringify(result)}`, () => {
            const res = alfonsine(input)
            expect(res).to.be.deep.equal(result)
        });
    });
});
