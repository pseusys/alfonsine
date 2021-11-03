import { expect } from "chai"

import { Zodiac } from "../code/types";
import { interpolate } from "../code/utils";

import { planeta } from "../code/generics";
import { saturn } from "../code/saturn";

import * as data from "../data/saturn.json"


describe("Saturn test", () => {
    const d = 537698.102777777777778
    const p = 19.37979742363
    const a = 10

    const delta = 0.00000000009

    const { equatum_centrum, equatum_argumentum } = planeta(data, d, p, a, false)

    const constrained_center_50 = 28.9854954845
    describe("Should calculate constrained center 50 correctly", () => {
        it(`Constrained center 50 should be equal to ${constrained_center_50}`, () => {
            const res = ((equatum_centrum + 340) % 360) / 6
            expect(res).to.be.approximately(constrained_center_50, delta)
        });
    });

    const constrained_argument = 41.97677808176667
    describe("Should calculate constrained argument correctly", () => {
        it(`Constrained argument should be equal to ${constrained_argument}`, () => {
            const res = equatum_argumentum / 6
            expect(res).to.be.approximately(constrained_argument, delta)
        });
    });

    const beta = -2.6328457918
    describe("Should calculate latitude correctly", () => {
        it(`Latitude should be equal to ${beta}`, () => {
            const res = interpolate(data['c5'], constrained_center_50) / 60 * (constrained_center_50 >= 15 && constrained_center_50 < 45 ? interpolate(data['c3'], constrained_argument) : interpolate(data['c4'], constrained_argument))
            expect(res).to.be.approximately(beta, delta)
        });
    });

    const result = {
        astronomic: {
            degrees: 80,
            minutes: 11
        },
        astrologic: {
            degrees: 20,
            minutes: 11
        },
        sign: Zodiac.GEMINI,
        latitude: {
            degrees: 1,
            minutes: 9
        },
        north: false
    }
    describe("Should execute function correctly", () => {
        const res = saturn(d, p, a)

        it(`Function execution result should be equal to ${JSON.stringify(result)}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });
});
