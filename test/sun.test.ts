import { expect } from "chai";

import { Zodiac } from "../code/types";
import { acc, interpolate } from "../code/utils";

import { media_longitudo as sun_longitudo, sun } from "../code/sun";

import * as data from "../data/sun.json"


describe("Sun test", () => {
    const d = 537698.102777777777778
    const p = 19.37979742363
    const a = 10

    const delta = 0.00000000009

    const media_motum = 60.1983162905
    describe("Should calculate media motum (increment of longitude) correctly", () => {
        it(`Increment of longitude should be equal to ${media_motum}`, () => {
            const res = (data['n'] * d) % 360
            expect(res).to.be.approximately(media_motum, delta)
        });
    });

    const media_longitudo = 338.54845733988
    describe("Should calculate media longitudo (mean longitude) correctly", () => {
        it(`Mean longitude should be equal to ${media_longitudo}`, () => {
            const res = (data['l0'] + media_motum) % 360
            expect(res).to.be.approximately(media_longitudo, delta)
        });
    });

    describe("Should calculate media longitudo (mean longitude) in a separate function correctly", () => {
        it(`Mean longitude should be equal to ${media_longitudo}`, () => {
            const res = sun_longitudo(d)
            expect(res).to.be.approximately(media_longitudo, delta)
        });
    });

    const augi = 90.80285297919
    describe("Should calculate augi (longitude solar apogee) correctly", () => {
        it(`Longitude solar apogee should be equal to ${augi}`, () => {
            const res = (data['la0'] + p) % 360
            expect(res).to.be.approximately(augi, delta)
        });
    });

    const argumentum = 247.7456043607
    describe("Should calculate argumentum (true anomaly) correctly", () => {
        it(`True anomaly should be equal to ${argumentum}`, () => {
            const res = acc((media_longitudo - augi + 360) % 360, a)
            expect(res).to.be.approximately(argumentum, delta)
        });
    });

    const equationum = 2.03993650743
    describe("Should calculate equationum (equation of center) correctly", () => {
        it(`Equation of center should be equal to ${equationum}`, () => {
            const res = interpolate(data['f_a'], argumentum)
            expect(res).to.be.approximately(equationum, delta)
        });
    });

    const verum_motum = 340.5883938473
    describe("Should calculate verum motum (true ecliptic longitude) correctly", () => {
        it(`True ecliptic longitude should be equal to ${verum_motum}`, () => {
            const res = media_longitudo + equationum
            expect(res).to.be.approximately(verum_motum, delta)
        });
    });

    const result = {
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
    describe("Should calculate function result correctly", () => {
        const _L_floor = Math.floor(verum_motum)
        const _minutes = Math.round((verum_motum - _L_floor) * 60)
        const res = {
            astronomic: {
                degrees: _L_floor,
                minutes: _minutes
            },
            astrologic: {
                degrees: _L_floor % 30,
                minutes: _minutes
            },
            sign: Zodiac.find(Math.floor(_L_floor / 30)),
            latitude: {
                degrees: 0,
                minutes: 0
            },
            north: undefined
        }

        it(`Function result should be equal to ${result}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });

    describe("Should execute function correctly", () => {
        const res = sun(d, p, a)

        it(`Function execution result should be equal to ${result}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });
});

