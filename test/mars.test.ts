import { expect } from "chai"

import { Zodiac } from "../code/types";
import { interpolate } from "../code/utils";

import { planeta } from "../code/generics";
import { mars } from "../code/mars";

import * as data from "../data/mars.json"


describe("Mars test", () => {
    const d = 537698.102777777777778
    const p = 19.37979742363
    const a = 10

    const delta = 0.00000000009

    const { equatum_centrum, equatum_argumentum } = planeta(data, d, p, a, false)

    const constrained_center_0 = 29.421571034099998
    describe("Should calculate constrained center 0 correctly", () => {
        it(`Constrained center 0 should be equal to ${constrained_center_0}`, () => {
            const res = equatum_centrum / 6
            expect(res).to.be.approximately(constrained_center_0, delta)
        });
    });

    const constrained_argument = 4.5726006803
    describe("Should calculate constrained argument correctly", () => {
        it(`Constrained argument should be equal to ${constrained_argument}`, () => {
            const res = equatum_argumentum / 6
            expect(res).to.be.approximately(constrained_argument, delta)
        });
    });

    const beta = -0.22533770185
    describe("Should calculate latitude correctly", () => {
        it(`Latitude should be equal to ${beta}`, () => {
            const res = interpolate(data['c5'], constrained_center_0) / 60 * (constrained_center_0 >= 15 && constrained_center_0 < 45 ? interpolate(data['c3'], constrained_argument) : interpolate(data['c4'], constrained_argument))
            expect(res).to.be.approximately(beta, delta)
        });
    });

    const result = {
        astronomic: {
            degrees: 322,
            minutes: 40
        },
        astrologic: {
            degrees: 22,
            minutes: 40
        },
        sign: Zodiac.AQUARIUS,
        latitude: {
            degrees: 0,
            minutes: 13
        },
        north: false
    }
    describe("Should execute function correctly", () => {
        const res = mars(d, p, a)

        it(`Function execution result should be equal to ${JSON.stringify(result)}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });
});
