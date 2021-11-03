import { Model, Zodiac } from "./types";
import { acc, interpolate } from "./utils";

import { media_longitudo } from "./sun";

import * as data from "../data/generics.json"


export function day_equation (day: number, accuracy: number): number {
    // media longitudo Solis (mean longitude of Sun)
    const Lm = acc(media_longitudo(day), accuracy)

    // equatione dierum (equation of day)
    return interpolate(data['f_g'], Lm)
}


export function build_model (verum_motum: number, latitude: number | null): Model {
    const _L_floor = Math.floor(verum_motum)
    const _minutes = Math.floor((verum_motum - _L_floor) * 60)
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
            degrees: latitude ? Math.floor(_abs_lat) : 0,
            minutes: latitude ? Math.floor((_abs_lat - Math.floor(_abs_lat)) * 60) : 0
        },
        north: latitude ? latitude > 0 : undefined
    }
}


type Planet = { equatum_centrum: number, equatum_argumentum: number, verum_motum: number }

/**
 * @param data planet data
 * @param day time (t-t0)
 * @param precession verum motum continuo et verum motum accessus et recessus
 * @param accuracy accuracy
 * @param proxima is proxima planet (Mercury or Venus) or remota (Mars, Jupiter, Saturn)
 */
export function planeta (data: any, day: number, precession: number, accuracy: number, proxima: boolean): Planet {
    // radix motus (mean longitude at epoch)
    const L0 = data['l0']

    // medij motus (rate of motion in mean longitude)
    const n = data['n']

    // media motum (increment of longitude) = medij motus * dierum
    const Ld = (n * day) % 360

    // media longitudo (mean longitude) = radix motus + media motum
    const Lm = (L0 + Ld + 360) % 360

    // radix augi (longitude of the apogee of the eccentre at epoch)
    const La0 = data['la0']

    // augi (longitude of the apogee of the eccentre) = radix augi + verum motum continuo et verum motum accessus et recessus
    const La = (La0 + precession + 360) % 360

    // centro medio (mean eccentric anomaly) = media longitudo - augi
    const k = (Lm - La + 360) % 360

    // argumento medio (mean epicyclic anomaly)
    let Am: number

    if (proxima) {
        // radix argumentis (mean epicyclic anomaly at epoch)
        const A0 = data['a0']

        // medij argumentis (rate of motion in mean anomaly)
        const m = data['m']

        // media motum argumentis (increment of anomaly) = medij argumentis * dierum
        const Ad = (m * day) % 360

        // argumento medio (mean epicyclic anomaly) = media motum argumentis + radix argumentis
        Am = (Ad + A0 + 360) % 360
    } else {
        // media longitudo Solis (mean longitude of Sun) = radix motus + media motum
        const LmS = media_longitudo(day)

        // argumento medio (mean epicyclic anomaly) = media longitudo Solis + media longitudo
        Am = (LmS - Lm + 360) % 360
    }

    // equationem hanc eandem centri equatam (equation of centre) = Et(centro medio)
    const Et = interpolate(data['et_k'], k)

    // equatum centrum (true eccentric anomaly) = centro medio + equationem hanc eandem centri equatam
    const k0 = acc((k + Et + 360) % 360, accuracy)

    // equatum argumentum (true epicyclic anomaly) = argumento medio - equationem hanc eandem centri equatam
    const A = acc((Am - Et + 360) % 360, accuracy)

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
    const Th = A <= 180 ? c_2 : -c_2

    // verum motum (true ecliptic longitude) = augi + equatum centrum + verum argumentum
    const L = (La + k0 + Th + 360) % 360

    return { equatum_centrum: k0, equatum_argumentum: A, verum_motum: L }
}
