import fs from "fs";
import { expect } from "chai"

import { media_longitudo } from "../code/caput";


describe("Caput draconis test", () => {
    const d = 537698.102777777777778

    const delta = 0.00000000009
    const caput_data = JSON.parse(fs.readFileSync('./data/caput.json').toString());

    const media_motum = 33.4066873075244000
    describe("Should calculate media motum (increment of longitude) correctly", () => {
        it(`Increment of longitude should be equal to ${media_motum}`, () => {
            const res = (caput_data['n'] * d) % 360
            expect(res).to.be.approximately(media_motum, delta)
        });
    });

    const mean_longitude = 234.6620117665500000
    describe("Should calculate media longitudo (mean longitude) correctly", () => {
        it(`Mean longitude should be equal to ${mean_longitude}`, () => {
            const res = (720 - caput_data['l0'] - media_motum) % 360
            expect(res).to.be.approximately(mean_longitude, delta)
        });
    });

    describe("Should function result correctly", () => {
        it(`Function result should be equal to ${mean_longitude}`, () => {
            const res = media_longitudo(d)
            expect(res).to.be.approximately(mean_longitude, delta)
        });
    });
});
