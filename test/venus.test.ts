import { expect } from "chai"

import { Zodiac } from "../code/types";
import { interpolate } from "../code/utils";

import { proxima } from "../code/generics";
import { venus } from "../code/venus";

import * as data from "../data/venus.json"


describe("Venus test", () => {
    const d = 537698.102777777777778
    const p = 19.37979742363
    const a = 10

    const delta = 0.00000000009

    const { equatum_centrum, equatum_argumentum } = proxima(data, d, p, a)

    const constrained_center_0 = 41.6318940722
    describe("Should calculate constrained center 0 correctly", () => {
        it(`Constrained center 0 should be equal to ${constrained_center_0}`, () => {
            const res = equatum_centrum / 6
            expect(res).to.be.approximately(constrained_center_0, delta)
        });
    });

    const constrained_center_90 = 56.6318940722
    describe("Should calculate constrained center 90 correctly", () => {
        it(`Constrained center 90 should be equal to ${constrained_center_90}`, () => {
            const res = ((equatum_centrum + 90) % 360) / 6
            expect(res).to.be.approximately(constrained_center_90, delta)
        });
    });

    const constrained_argument = 11.1109039219
    describe("Should calculate constrained argument correctly", () => {
        it(`Constrained argument should be equal to ${constrained_argument}`, () => {
            const res = equatum_argumentum / 6
            expect(res).to.be.approximately(constrained_argument, delta)
        });
    });

    const declination = -0.44167737705
    describe("Should calculate declination (inclination) correctly", () => {
        it(`Declination (inclination) should be equal to ${declination}`, () => {
            const res = interpolate(data['c3'], constrained_argument) * interpolate(data['c5'], constrained_center_90) / 60
            expect(res).to.be.approximately(declination, delta)
        });
    });

    const reflection = -0.50821082762
    describe("Should calculate reflection (obliquation) correctly", () => {
        it(`Reflection (obliquation) should be equal to ${reflection}`, () => {
            const res = interpolate(data['c4'], constrained_argument) * interpolate(data['c5'], constrained_center_0) / 60
            expect(res).to.be.approximately(reflection, delta)
        });
    });

    const third = 0.01966277129
    describe("Should calculate third correctly", () => {
        it(`Third should be equal to ${third}`, () => {
            const res = 1/6 * (interpolate(data['c5'], constrained_center_0) / 60) ** 2
            expect(res).to.be.approximately(third, delta)
        });
    });

    const latitude = -0.93022543337
    describe("Should calculate latitude correctly", () => {
        it(`Latitude should be equal to ${latitude}`, () => {
            const res = declination + reflection + third
            expect(res).to.be.approximately(latitude, delta)
        });
    });

    const result = {
        astronomic: {
            degrees: 7,
            minutes: 56
        },
        astrologic: {
            degrees: 7,
            minutes: 56
        },
        sign: Zodiac.ARIES,
        latitude: {
            degrees: 0,
            minutes: 55
        },
        north: false
    }
    describe("Should execute function correctly", () => {
        const res = venus(d, p, a)

        it(`Function execution result should be equal to ${JSON.stringify(result)}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });
});

