import { expect } from "chai"

import { Zodiac } from "../code/types";
import { interpolate } from "../code/utils";

import { proxima } from "../code/generics";
import { mercury } from "../code/mercury";

import * as data from "../data/mercury.json"


describe("Mercury test", () => {
    const d = 537698.102777777777778
    const p = 19.37979742363
    const a = 10

    const delta = 0.00000000009

    const { equatum_centrum, equatum_argumentum } = proxima(data, d, p, a)

    const constrained_center_0 = 21.0155206481
    describe("Should calculate constrained center 0 correctly", () => {
        it(`Constrained center 0 should be equal to ${constrained_center_0}`, () => {
            const res = equatum_centrum / 6
            expect(res).to.be.approximately(constrained_center_0, delta)
        });
    });

    const constrained_center_180 = 51.0155206481
    describe("Should calculate constrained center 180 correctly", () => {
        it(`Constrained center 180 should be equal to ${constrained_center_180}`, () => {
            const res = ((equatum_centrum + 180) % 360) / 6
            expect(res).to.be.approximately(constrained_center_180, delta)
        });
    });

    const constrained_center_270 = 6.0155206481
    describe("Should calculate constrained center 270 correctly", () => {
        it(`Constrained center 270 should be equal to ${constrained_center_270}`, () => {
            const res = ((equatum_centrum + 270) % 360) / 6
            expect(res).to.be.approximately(constrained_center_270, delta)
        });
    });

    const constrained_argument = 19.2974375324
    describe("Should calculate constrained argument correctly", () => {
        it(`Constrained argument should be equal to ${constrained_argument}`, () => {
            const res = equatum_argumentum / 6
            expect(res).to.be.approximately(constrained_argument, delta)
        });
    });

    const declination = 0.9620764598688786
    describe("Should calculate declination (inclination) correctly", () => {
        it(`Declination (inclination) should be equal to ${declination}`, () => {
            const res = interpolate(data['c3'], constrained_argument) * interpolate(data['c5'], constrained_center_270) / 60
            expect(res).to.be.approximately(declination, delta)
        });
    });

    const reflection = 1.6135419992
    describe("Should calculate reflection (obliquation) correctly", () => {
        it(`Reflection (obliquation) should be equal to ${reflection}`, () => {
            const res = interpolate(data['c4'], constrained_argument) * (equatum_centrum >= 90 && equatum_centrum < 270 ? 1.1 : 0.9) * interpolate(data['c5'], constrained_center_180) / 60
            expect(res).to.be.approximately(reflection, delta)
        });
    });

    const third = 0.1296135716
    describe("Should calculate third correctly", () => {
        it(`Third should be equal to ${third}`, () => {
            const res = 0.375 * (interpolate(data['c5'], constrained_center_0) / 60) ** 2
            expect(res).to.be.approximately(third, delta)
        });
    });

    const latitude = 2.7052320306688786
    describe("Should calculate latitude correctly", () => {
        it(`Latitude should be equal to ${latitude}`, () => {
            const res = declination + reflection + third
            expect(res).to.be.approximately(latitude, delta)
        });
    });

    const result = {
        astronomic: {
            degrees: 359,
            minutes: 59
        },
        astrologic: {
            degrees: 29,
            minutes: 59
        },
        sign: Zodiac.PISCES,
        latitude: {
            degrees: 2,
            minutes: 42
        },
        north: true
    }
    describe("Should execute function correctly", () => {
        const res = mercury(d, p, a)

        it(`Function execution result should be equal to ${JSON.stringify(result)}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });
});
