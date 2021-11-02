import { expect } from "chai"

import { Zodiac } from "../code/types";
import { acc, interpolate } from "../code/utils";

import { day_equation } from "../code/generics";
import { media_longitudo as sun_longitudo } from "../code/sun";
import { media_longitudo as caput_longitudo } from "../code/caput";
import { moon } from "../code/moon";

import * as data from "../data/moon.json"


describe("Moon test", () => {
    const d = 537698.102777777777778
    const a = 10

    const delta = 0.00000000009

    const dierum = 537698.0753940311
    describe("Should calculate dierum (time) correctly", () => {
        it(`Time should be equal to ${dierum}`, () => {
            const res = d - day_equation(d, a)
            expect(res).to.be.approximately(dierum, delta)
        });
    });

    const media_motum = 122.0655367011
    describe("Should calculate media motum (increment of longitude) correctly", () => {
        it(`Increment of longitude should be equal to ${media_motum}`, () => {
            const res = (data['n'] * dierum) % 360
            expect(res).to.be.approximately(media_motum, delta)
        });
    });

    const media_longitudo_Lune = 244.8461694171
    describe("Should calculate media longitudo Lune (mean longitude of Moon) correctly", () => {
        it(`Mean longitude of Moon should be equal to ${media_longitudo_Lune}`, () => {
            const res = (data['l0'] + media_motum) % 360
            expect(res).to.be.approximately(media_longitudo_Lune, delta)
        });
    });

    const elongationum = 266.2977120772
    describe("Should calculate elongationum (Lunar-Solar elongation) correctly", () => {
        it(`Lunar-Solar elongation should be equal to ${elongationum}`, () => {
            const res = (media_longitudo_Lune - sun_longitudo(d) + 360) % 360
            expect(res).to.be.approximately(elongationum, delta)
        });
    });

    const elongationum_dupla = 172.5954241544
    describe("Should calculate elongationum dupla (double elongation) correctly", () => {
        it(`Double elongation should be equal to ${elongationum_dupla}`, () => {
            const res = acc((elongationum * 2) % 360, a)
            expect(res).to.be.approximately(elongationum_dupla, delta)
        });
    });

    const media_motum_argumentis = 339.14623543806
    describe("Should calculate media motum argumentis (increment of anomaly) correctly", () => {
        it(`Increment of anomaly should be equal to ${media_motum_argumentis}`, () => {
            const res = (data['m'] * dierum) % 360
            expect(res).to.be.approximately(media_motum_argumentis, delta)
        });
    });

    const media_argumentum = 178.150269157196
    describe("Should calculate media argumentum (mean anomaly) correctly", () => {
        it(`Media argumentum should be equal to ${media_argumentum}`, () => {
            const res = (data['a0'] + media_motum_argumentis) % 360
            expect(res).to.be.approximately(media_argumentum, delta)
        });
    });

    const equatio_centris = 2.6681919485
    describe("Should calculate equatio centris (equalization of the mean anomaly) correctly", () => {
        it(`Equatio centris should be equal to ${equatio_centris}`, () => {
            const res = interpolate(data['c3_2d'], elongationum_dupla)
            expect(res).to.be.approximately(equatio_centris, delta)
        });
    });

    const argumentum = 180.8184611057
    describe("Should calculate argumentum (true anomaly) correctly", () => {
        it(`Argumentum should be equal to ${argumentum}`, () => {
            const res = acc((media_argumentum + equatio_centris) % 360, a)
            expect(res).to.be.approximately(argumentum, delta)
        });
    });

    const equatio_primo_examinata = 0.0772991045
    describe("Should calculate equatio primo examinata (equalization of the excentricity anomaly) correctly", () => {
        it(`Equatio primo examinata should be equal to ${equatio_primo_examinata}`, () => {
            const res = interpolate(data['c4_a'], argumentum)
            expect(res).to.be.approximately(equatio_primo_examinata, delta)
        });
    });

    const diuersitas_diametry = 0.05456407379
    describe("Should calculate diuersitas diametry (excess epicyclic anomaly) correctly", () => {
        it(`Diuersitas diametry should be equal to ${diuersitas_diametry}`, () => {
            const res = interpolate(data['c5_a'], argumentum)
            expect(res).to.be.approximately(diuersitas_diametry, delta)
        });
    });

    const minuta_proportionalis = 60
    describe("Should calculate minuta proportionalis (proportionality coefficient) correctly", () => {
        it(`Minuta proportionalis should be equal to ${minuta_proportionalis}`, () => {
            const res = interpolate(data['c6_2d'], argumentum)
            expect(res).to.be.approximately(minuta_proportionalis, delta)
        });
    });

    const equatio_secundo_examinata = 0.13186317829
    describe("Should calculate equatio secundo examinata (second equalization of the anomaly) correctly", () => {
        it(`Equatio secundo examinata should be equal to ${equatio_secundo_examinata}`, () => {
            const res = equatio_primo_examinata + diuersitas_diametry * minuta_proportionalis / 60
            expect(res).to.be.approximately(equatio_secundo_examinata, delta)
        });
    });

    const verum_locum_Lune = 244.97803259538998
    describe("Should calculate verum locum Lune (true ecliptic longitude) correctly", () => {
        it(`Verum locum Lune should be equal to ${verum_locum_Lune}`, () => {
            const res = (media_longitudo_Lune + equatio_secundo_examinata) % 360
            expect(res).to.be.approximately(verum_locum_Lune, delta)
        });
    });

    const omega = 10.3160208288
    describe("Should calculate latitude argument correctly", () => {
        it(`Latitude argument should be equal to ${omega}`, () => {
            const res = (verum_locum_Lune - caput_longitudo(d) + 360) % 360
            expect(res).to.be.approximately(omega, delta)
        });
    });

    const beta = 0.8939817820
    describe("Should calculate latitude correctly", () => {
        it(`Latitude should be equal to ${beta}`, () => {
            const res = interpolate(data['b'], omega)
            expect(res).to.be.approximately(beta, delta)
        });
    });

    const result = {
        astronomic: {
            degrees: 244,
            minutes: 58
        },
        astrologic: {
            degrees: 4,
            minutes: 58
        },
        sign: Zodiac.SAGITTARIUS,
        latitude: {
            degrees: 0,
            minutes: 53
        },
        north: true
    }
    describe("Should execute function correctly", () => {
        const res = moon(d, a)

        it(`Function execution result should be equal to ${JSON.stringify(result)}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });
});
