import { expect } from "chai"

import { Precession } from "../code/types";
import { acc, interpolate } from "../code/utils";

import { precession_model } from "../code/sphere";

import * as data from "../data/sphere.json"


describe("Octaue sphere test", () => {
    const d = 537698.102777777777778
    const a = 10

    const delta = 0.00000000009

    describe("Should calculate Ptolemy precession correctly", () => {
        const precession = 14.7314548706
        it(`Ptolemy precession should be equal to ${precession}`, () => {
            const res = precession_model(Precession.PTOLEMY, d, a)
            expect(res).to.be.approximately(precession, delta)
        });
    });

    describe("Should calculate close to true precession correctly", () => {
        const precession = 20.4463496379
        it(`Close to true precession should be equal to ${precession}`, () => {
            const res = precession_model(Precession.TRUE, d, a)
            expect(res).to.be.approximately(precession, delta)
        });
    });

    const media_motum_augi = 10.81570237355
    describe("Should calculate media motum augi (linear displacement of apogees) correctly", () => {
        it(`Linear displacement of apogees should be equal to ${media_motum_augi}`, () => {
            const res = data['n'] * d
            expect(res).to.be.approximately(media_motum_augi, delta)
        });
    });

    const media_motum_octaue_sphere = 75.70991200493
    describe("Should calculate media motum octaue sphere (displacement due to trepidation) correctly", () => {
        it(`Displacement due to trepidation should be equal to ${media_motum_octaue_sphere}`, () => {
            const res = data['n1'] * d
            expect(res).to.be.approximately(media_motum_octaue_sphere, delta)
        });
    });

    const motum_octaue_sphere = 74.91935644940
    describe("Should calculate motum octaue sphere (displacement of the eighth sphere) correctly", () => {
        it(`Displacement of the eighth sphere should be equal to ${motum_octaue_sphere}`, () => {
            const res = acc((data['l0'] + media_motum_octaue_sphere) % 360, a)
            expect(res).to.be.approximately(motum_octaue_sphere, delta)
        });
    });

    const aequationum_motus_accessus_at_recessus_sphaere_stellate = 8.68770616120
    describe("Should calculate aequationum motus accessus at recessus sphaere stellate (equalization of the eighth sphere) correctly", () => {
        it(`Equalization of the eighth sphere should be equal to ${aequationum_motus_accessus_at_recessus_sphaere_stellate}`, () => {
            const res = interpolate(data['q_lm'], motum_octaue_sphere)
            expect(res).to.be.approximately(aequationum_motus_accessus_at_recessus_sphaere_stellate, delta)
        });
    });

    const verum_motum_accessus_et_recessus = 8.56409505009
    describe("Should calculate verum motum accessus et recessus (true ecliptic longitude) correctly", () => {
        it(`True ecliptic longitude should be equal to ${verum_motum_accessus_et_recessus}`, () => {
            const res = aequationum_motus_accessus_at_recessus_sphaere_stellate - data['eme']
            expect(res).to.be.approximately(verum_motum_accessus_et_recessus, delta)
        });
    });

    const verum_motum_continuo_et_verum_motum_accessus_et_recessus = 19.37979742363
    describe("Should calculate verum motum continuo et verum motum accessus et recessus (total precession displacement) correctly", () => {
        it(`Total precession displacement should be equal to ${verum_motum_continuo_et_verum_motum_accessus_et_recessus}`, () => {
            const res = media_motum_augi + verum_motum_accessus_et_recessus
            expect(res).to.be.approximately(verum_motum_continuo_et_verum_motum_accessus_et_recessus, delta)
        });
    });

    describe("Should calculate trepidation precession correctly", () => {
        const res = precession_model(Precession.TREPIDATION, d, a)
        it(`Trepidation precession should be equal to ${verum_motum_continuo_et_verum_motum_accessus_et_recessus}`, () => {
            expect(res).to.be.approximately(verum_motum_continuo_et_verum_motum_accessus_et_recessus, delta)
        });
    });
});

