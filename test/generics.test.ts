import { expect } from "chai"

import { build_model, day_equation, proxima } from "../code/generics";

import * as mercury_data from "../data/mercury.json"
import * as venus_data from "../data/venus.json"
import {Zodiac} from "../code/types";


describe("Generics test", () => {
    const d = 537698.102777777777778

    const delta = 0.00000000009

    describe("Should calculate day equation with given accuracy correctly", () => {
        const low = 5
        const high = 10
        const d_low = 0.0273837556
        const d_high = 0.0273837467

        it(`Day ${d} with accuracy ${low} should be equal to ${d_low}`, () => {
            const res = day_equation(d, low)
            expect(res).to.be.approximately(d_low, delta)
        });
        it(`Day ${d} with accuracy ${high} should be equal to ${d_high}`, () => {
            const res = day_equation(d, high)
            expect(res).to.be.approximately(d_high, delta)
        });
    });

    describe("Should build model correctly", () => {
        const verum_motum = 340.5883938473
        const result_no_lat = {
            astronomic: {
                degrees: 340,
                minutes: 35
            },
            astrologic: {
                degrees: 10,
                minutes: 35
            },
            sign: Zodiac.PISCES,
            latitude: {
                degrees: 0,
                minutes: 0
            },
            north: undefined
        }
        const latitude = 2.7052320306688786
        const result_with_lat = {
            astronomic: {
                degrees: 340,
                minutes: 35
            },
            astrologic: {
                degrees: 10,
                minutes: 35
            },
            sign: Zodiac.PISCES,
            latitude: {
                degrees: 2,
                minutes: 42
            },
            north: true
        }

        it(`Model without latitude should be equal to ${JSON.stringify(result_no_lat)}`, () => {
            const res = build_model(verum_motum, null)
            expect(res).to.be.deep.eq(result_no_lat)
        });
        it(`Model with latitude should be equal to ${JSON.stringify(result_with_lat)}`, () => {
            const res = build_model(verum_motum, latitude)
            expect(res).to.be.deep.eq(result_with_lat)
        });
    });

    describe("Should calculate longitude for Mercury and Venus correctly", () => {
        const d = 537698.102777777777778
        const p = 19.37979742363
        const a = 10

        describe("Should calculate longitude of Mercury correctly", () => {
            const equatum_centrum = 126.0931238888
            const equatum_argumentum = 115.7846251945
            const verum_motum = 359.9835552128

            const res = proxima(mercury_data, d, p, a);

            it(`True eccentric anomaly should be equal to ${equatum_centrum}`, () => {
                expect(res.equatum_centrum).to.be.approximately(equatum_centrum, delta)
            });
            it(`True epicyclic anomaly should be equal to ${equatum_argumentum}`, () => {
                expect(res.equatum_argumentum).to.be.approximately(equatum_argumentum, delta)
            });
            it(`True ecliptic longitude should be equal to ${verum_motum}`, () => {
                expect(res.verum_motum).to.be.approximately(verum_motum, delta)
            });
        });

        describe("Should calculate longitude of Venus correctly", () => {
            const equatum_centrum = 249.7913644334
            const equatum_argumentum = 66.66542353150
            const verum_motum = 7.9350158725676

            const res = proxima(venus_data, d, p, a);

            it(`True eccentric anomaly should be equal to ${equatum_centrum}`, () => {
                expect(res.equatum_centrum).to.be.approximately(equatum_centrum, delta)
            });
            it(`True epicyclic anomaly should be equal to ${equatum_argumentum}`, () => {
                expect(res.equatum_argumentum).to.be.approximately(equatum_argumentum, delta)
            });
            it(`True ecliptic longitude should be equal to ${verum_motum}`, () => {
                expect(res.verum_motum).to.be.approximately(verum_motum, delta)
            });
        });
    });
});
