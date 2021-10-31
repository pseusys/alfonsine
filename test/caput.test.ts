import { expect } from "chai"

import { media_longitudo } from "../code/caput";

import * as data from "../data/caput.json"


describe("Caput draconis test", () => {
    const d = 537698.102777777777778

    const delta = 0.00000000009

    const media_motum = 33.4066873075244000
    describe("Should calculate media motum (increment of longitude) correctly", () => {
        it(`Increment of longitude should be equal to ${media_motum}`, () => {
            const res = (data['n'] * d) % 360
            expect(res).to.be.approximately(media_motum, delta)
        });
    });

    const mean_longitude = 234.6620117665500000
    describe("Should calculate media longitudo (mean longitude) correctly", () => {
        it(`Mean longitude should be equal to ${mean_longitude}`, () => {
            const res = (720 - data['l0'] - media_motum) % 360
            expect(res).to.be.approximately(mean_longitude, delta)
        });
    });

    describe("Should calculate function result correctly", () => {
        it(`Function result should be equal to ${mean_longitude}`, () => {
            const res = media_longitudo(d)
            expect(res).to.be.approximately(mean_longitude, delta)
        });
    });
});
