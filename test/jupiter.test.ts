import { expect } from "chai"

import { Zodiac } from "../code/types";
import { interpolate } from "../code/utils";

import { planeta } from "../code/generics";
import { jupiter } from "../code/jupiter";

import * as data from "../data/jupiter.json"


describe("Jupiter test", () => {
    const d = 537698.102777777777778
    const p = 19.37979742363
    const a = 10

    const delta = 0.00000000009

    const { equatum_centrum, equatum_argumentum } = planeta(data, d, p, a, false)

    const constrained_center_20 = 6.60179222578
    describe("Should calculate constrained center 20 correctly", () => {
        it(`Constrained center 20 should be equal to ${constrained_center_20}`, () => {
            const res = ((equatum_centrum + 340) % 360) / 6
            expect(res).to.be.approximately(constrained_center_20, delta)
        });
    });

    const constrained_argument = 17.6568702294
    describe("Should calculate constrained argument correctly", () => {
        it(`Constrained argument should be equal to ${constrained_argument}`, () => {
            const res = equatum_argumentum / 6
            expect(res).to.be.approximately(constrained_argument, delta)
        });
    });

    const beta = 1.2516515971779
    describe("Should calculate latitude correctly", () => {
        it(`Latitude should be equal to ${beta}`, () => {
            const res = interpolate(data['c5'], constrained_center_20) / 60 * (constrained_center_20 >= 15 && constrained_center_20 < 45 ? interpolate(data['c3'], constrained_argument) : interpolate(data['c4'], constrained_argument))
            expect(res).to.be.approximately(beta, delta)
        });
    });

    const result = {
        astronomic: {
            degrees: 243,
            minutes: 22
        },
        astrologic: {
            degrees: 3,
            minutes: 22
        },
        sign: Zodiac.SAGITTARIUS,
        latitude: {
            degrees: 1,
            minutes: 15
        },
        north: true
    }
    describe("Should execute function correctly", () => {
        const res = jupiter(d, p, a)

        it(`Function execution result should be equal to ${JSON.stringify(result)}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });
});
