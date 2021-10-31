import { expect } from "chai"

import { Zodiac } from "../code/types";
import { acc, interpolate } from "../code/utils";

import { mercury } from "../code/mercury";

import * as data from "../data/mercury.json"


describe("Mercury test", () => {
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
            const res = (data['l0'] + media_motum + 360) % 360
            expect(res).to.be.approximately(media_longitudo, delta)
        });
    });

    const augi = 210.03898260882
    describe("Should calculate augi (longitude of the apogee of the eccentre) correctly", () => {
        it(`Longitude of the apogee of the eccentre should be equal to ${augi}`, () => {
            const res = (data['la0'] + p + 360) % 360
            expect(res).to.be.approximately(augi, delta)
        });
    });

    const centro_medio = 128.50947473105998
    describe("Should calculate centro medio (mean eccentric anomaly) correctly", () => {
        it(`Mean eccentric anomaly should be equal to ${centro_medio}`, () => {
            const res = (media_longitudo - augi + 360) % 360
            expect(res).to.be.approximately(centro_medio, delta)
        });
    });

    const media_motum_argumentis = 67.9688299077
    describe("Should calculate media motum argumentis (increment of anomaly) correctly", () => {
        it(`Increment of anomaly should be equal to ${media_motum_argumentis}`, () => {
            const res = (data['m'] * d) % 360
            expect(res).to.be.approximately(media_motum_argumentis, delta)
        });
    });

    const argumento_medio = 113.3682743521
    describe("Should calculate argumento medio (mean epicyclic anomaly) correctly", () => {
        it(`Mean epicyclic anomaly should be equal to ${argumento_medio}`, () => {
            const res = (media_motum_argumentis + data['a0'] + 360) % 360
            expect(res).to.be.approximately(argumento_medio, delta)
        });
    });

    const equationem_hanc_eandem_centri_equatam = -2.41635084229
    describe("Should calculate equationem hanc eandem centri equatam (equation of centre) correctly", () => {
        it(`Equation of centre should be equal to ${equationem_hanc_eandem_centri_equatam}`, () => {
            const res = interpolate(data['et_k'], centro_medio)
            expect(res).to.be.approximately(equationem_hanc_eandem_centri_equatam, delta)
        });
    });

    const equatum_centrum = 126.0931238888
    describe("Should calculate equatum centrum (true eccentric anomaly) correctly", () => {
        it(`True eccentric anomaly should be equal to ${equatum_centrum}`, () => {
            const res = acc((centro_medio + equationem_hanc_eandem_centri_equatam + 360) % 360, a)
            expect(res).to.be.approximately(equatum_centrum, delta)
        });
    });

    const equatum_argumentum = 115.7846251944
    describe("Should calculate equatum argumentum (true epicyclic anomaly) correctly", () => {
        it(`True epicyclic anomaly should be equal to ${equatum_argumentum}`, () => {
            const res = acc((argumento_medio - equationem_hanc_eandem_centri_equatam + 360) % 360, a)
            expect(res).to.be.approximately(equatum_argumentum, delta)
        });
    });

    const minuta_proportionalis = 59.00000000000
    describe("Should calculate minuta proportionalis (proportionality coefficient) correctly", () => {
        it(`Proportionality coefficient should be equal to ${minuta_proportionalis}`, () => {
            const res = interpolate(data['c8_k0'], equatum_centrum)
            expect(res).to.be.approximately(minuta_proportionalis, delta)
        });
    });

    const longitudo_longior = 3.0797437532
    describe("Should calculate longitudo longior (longitude subtrahend) correctly", () => {
        it(`Longitude subtrahend should be equal to ${longitudo_longior}`, () => {
            const res = interpolate(data['c5_a'], equatum_argumentum)
            expect(res).to.be.approximately(longitudo_longior, delta)
        });
    });

    const equatio_argumentis_primo_examenata = 21.97025624671
    describe("Should calculate equatio argumentis primo examenata (equalization of the epicyclic anomaly) correctly", () => {
        it(`Equalization of the epicyclic anomaly should be equal to ${equatio_argumentis_primo_examenata}`, () => {
            const res = interpolate(data['c6_a'], equatum_argumentum)
            expect(res).to.be.approximately(equatio_argumentis_primo_examenata, delta)
        });
    });

    const longitudo_propior = 1.91307708662
    describe("Should calculate longitudo propior (longitude added) correctly", () => {
        it(`Longitude added should be equal to ${longitudo_propior}`, () => {
            const res = interpolate(data['c7_a'], equatum_argumentum)
            expect(res).to.be.approximately(longitudo_propior, delta)
        });
    });

    const diuersitate_diametri = 1.88119246851
    describe("Should calculate diuersitate diametri (proportional additive) correctly", () => {
        it(`Proportional additive should be equal to ${diuersitate_diametri}`, () => {
            const res = minuta_proportionalis / 60 * (minuta_proportionalis <= 0 ? longitudo_longior : longitudo_propior)
            expect(res).to.be.approximately(diuersitate_diametri, delta)
        });
    });

    const equatio_argumentis_secundo_examenata = 23.85144871522
    describe("Should calculate equatio argumentis secundo examenata (secondar equalization of the epicyclic anomaly) correctly", () => {
        it(`Secondar equalization of the epicyclic anomaly should be equal to ${equatio_argumentis_secundo_examenata}`, () => {
            const res = equatio_argumentis_primo_examenata + diuersitate_diametri
            expect(res).to.be.approximately(equatio_argumentis_secundo_examenata, delta)
        });
    });

    const verum_argumentum = 23.85144871522
    describe("Should calculate verum argumentum (equation of anomaly) correctly", () => {
        it(`Equation of anomaly should be equal to ${verum_argumentum}`, () => {
            const res = equatum_argumentum < 180 ? equatio_argumentis_secundo_examenata : -equatio_argumentis_secundo_examenata
            expect(res).to.be.approximately(verum_argumentum, delta)
        });
    });

    const verum_motum = 359.9835552128
    describe("Should calculate verum motum (true ecliptic longitude) correctly", () => {
        it(`True ecliptic longitude should be equal to ${verum_motum}`, () => {
            const res = (augi + equatum_centrum + verum_argumentum + 360) % 360
            expect(res).to.be.approximately(verum_motum, delta)
        });
    });

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
    describe("Should calculate function result correctly", () => {
        const _L_floor = Math.floor(verum_motum)
        const _minutes = Math.round((verum_motum - _L_floor) * 60)
        const _abs_lat = Math.abs(latitude)
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
                degrees: Math.floor(_abs_lat),
                minutes: Math.floor((_abs_lat - Math.floor(_abs_lat)) * 60)
            },
            north: latitude > 0
        }

        it(`Function result should be equal to ${result}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });

    describe("Should execute function correctly", () => {
        const res = mercury(d, p, a)

        it(`Function execution result should be equal to ${result}`, () => {
            expect(res).to.be.deep.eq(result)
        });
    });
});
