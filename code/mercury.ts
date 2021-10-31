import { Model, Zodiac } from "./types";
import { acc, interpolate } from "./utils";

import * as data from "../data/mercury.json"


/**
 * @param d time (t-t0)
 * @param p verum motum continuo et verum motum accessus et recessus
 * @param a accuracy
 */
export function mercury (d: number, p: number , a: number): Model {
    // radix motus (mean longitude at epoch)
    const L0 = data['l0']

    // medij motus (rate of motion in mean longitude)
    const n = data['n']

    // media motum (increment of longitude) = medij motus * dierum
    const Ld = (n * d) % 360

    // media longitudo (mean longitude) = radix motus + media motum
    const Lm = (L0 + Ld + 360) % 360

    // radix augi (longitude of the apogee of the eccentre at epoch)
    const La0 = data['la0']

    // augi (longitude of the apogee of the eccentre) = radix augi + verum motum continuo et verum motum accessus et recessus
    const La = (La0 + p + 360) % 360

    // centro medio (mean eccentric anomaly) = media longitudo - augi
    const k = (Lm - La + 360) % 360

    // radix argumentis (mean epicyclic anomaly at epoch)
    const A0 = data['a0']

    // medij argumentis (rate of motion in mean anomaly)
    const m = data['m']

    // media motum argumentis (increment of anomaly) = medij argumentis * dierum
    const Ad = (m * d) % 360

    // argumento medio (mean epicyclic anomaly) = media motum argumentis + radix argumentis
    const Am = (Ad + A0 + 360) % 360

    // equationem hanc eandem centri equatam (equation of centre) = Et(centro medio)
    const Et = interpolate(data['et_k'], k)

    // equatum centrum (true eccentric anomaly) = centro medio + equationem hanc eandem centri equatam
    const k0 = acc((k + Et + 360) % 360, a)

    // equatum argumentum (true epicyclic anomaly) = argumento medio - equationem hanc eandem centri equatam
    const A = acc((Am - Et + 360) % 360, a)

    // minuta proportionalis (proportionality coefficient) = c8(equatum centrum)
    const c8 = interpolate(data['c8_k0'], k0)

    // longitudo longior (longitude subtrahend) = c5(equatum argumentum)
    const c5 = interpolate(data['c5_a'], A)

    // equatio argumentis primo examenata (equalization of the epicyclic anomaly) = c6(equatum argumentum)
    const c6 = interpolate(data['c6_a'], A)

    // longitudo propior (longitude added) = c7(equatum argumentum)
    const c7 = interpolate(data['c7_a'], A)

    // diuersitate diametri (proportional additive) = minuta proportionalis / 60 * (minuta proportionalis <= 0 ? longitudo longior : longitudo propior)
    const c_1 = c8 / 60 * (c8 <= 0 ? c5 : c7)

    // equatio argumentis secundo examenata (secondar equalization of the epicyclic anomaly) = equatio argumentis primo examenata + diuersitate diametri
    const c_2 = c6 + c_1

    // verum argumentum (equation of anomaly) = (equatum argumentum > 180 ? + : - ) equatio argumentis secundo examenata
    const Th = A < 180 ? c_2 : -c_2

    // verum motum (true ecliptic longitude) = augi + equatum centrum + verum argumentum
    const L = (La + k0 + Th + 360) % 360

    // Latitude calculation:

    // constrained center 0 = equatum centrum prepared for interpolation with step 6
    const cc0 = k0 / 6

    // constrained center 180 = equatum centrum + 180 prepared for interpolation with step 6
    const cc180 = ((k0 + 180) % 360) / 6

    // constrained center 270 = equatum centrum + 270 prepared for interpolation with step 6
    const cc270 = ((k0 + 270) % 360) / 6

    // constrained argument = equatum argumentum prepared for interpolation with step 6
    const ca = A / 6

    // declination = D33 * c5(constrained center 270) / 60
    const decl = interpolate(data['c3'], ca) * interpolate(data['c5'], cc270) / 60

    // reflection = c4(constrained argument / 6.3) * (equatum centrum >= 90 and equatum centrum < 270 ? 1.1 : 0.9) * c5(constrained center 180) / 60
    const refl = interpolate(data['c4'], ca) * (k0 >= 90 && k0 < 270 ? 1.1 : 0.9) * interpolate(data['c5'], cc180) / 60

    // third = 0.375 * (c5(constrained center 0) / 60) ^ 2
    const third = 0.375 * (interpolate(data['c5'], cc0) / 60) ** 2

    // latitude = declination + reflection + third
    const latitude = decl + refl + third

    // Building Model:

    const _L_floor = Math.floor(L)
    const _minutes = Math.round((L - _L_floor) * 60)
    const _abs_lat = Math.abs(latitude)
    return {
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
}
