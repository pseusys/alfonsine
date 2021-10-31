import { Model, Zodiac } from "./types";
import { acc, interpolate } from "./utils";

import { day_equation } from "./generics";
import { media_longitudo as sun_longitudo } from "./sun";
import { media_longitudo as caput_longitudo } from "./caput";

import * as data from "../data/moon.json"


/**
 * @param d time (t-t0)
 * @param a accuracy
 */
export function moon (d: number, a: number): Model {
    // radix motus (mean longitude at epoch)
    const L0 = data['l0']

    // media motus (rate of motion in mean longitude)
    const n = data['n']

    // dierum (time)
    const _d = d - day_equation(d, a)

    // media motum (increment of longitude) = media motus * dierum
    const Ld = (n * _d) % 360

    // media longitudo Lune (mean longitude of Moon)
    const LmM = (L0 + Ld) % 360

    // media longitudo Solis (mean longitude of Sun) = radix motus + media motum
    const LmS = sun_longitudo(d)

    // elongationum (Lunar-Solar elongation) = media longitudo Lune - media longitudo Solis
    const D = (LmM - LmS + 360) % 360

    // elongationum dupla (double elongation) = elongationum * 2
    const D2 = acc((D * 2) % 360, a)

    // radix argumentis (mean anomaly at epoh)
    const A0 = data['a0']

    // medij argumentis (rate of motion in mean anomaly)
    const m = data['m']

    // media motum argumentis (increment of anomaly) = medij argumentis * dierum
    const Ad = (m * _d) % 360

    // media argumentum (mean anomaly) = radix argumentis + media motum argumentis
    const Am = (A0 + Ad) % 360

    // equatio centris (equalization of the mean anomaly) = c3(elongationum dupla)
    const c3 = interpolate(data['c3_2d'], D2)

    // argumentum (true anomaly) = media argumentum + c3(elongationum dupla)
    const A = acc((Am + c3) % 360, a)

    // equatio primo examinata (equalization of the excentricity anomaly) = c4(argumentum)
    const c4 = interpolate(data['c4_a'], A)

    // diuersitas diametry (excess epicyclic anomaly) = c5(argumentum)
    const c5 = interpolate(data['c5_a'], A)

    // minuta proportionalis (proportionality coefficient) = c6(elongationum dupla)
    const c6 = interpolate(data['c6_2d'], D2)

    // equatio secundo examinata (second equalization of the anomaly) = equatio primo examinata + diuersitas diametry * minuta proportionalis / 60
    const c = c4 + c5 * c6 / 60

    // verum locum (true ecliptic longitude) = media longitudo Lune + equatio secundo examinata
    const L = (LmM + c) % 360

    // Latitude calculation:

    // latitude argument = verum locum - media longitudo Capitis Draconis
    const omega = (L - caput_longitudo(d) + 360) % 360

    // latitude = b(latitude argument)
    const beta = interpolate(data['b'], omega)

    // Building Model:

    const _L_floor = Math.floor(L)
    const _minutes = Math.floor((L - _L_floor) * 60)
    const _abs_beta = Math.abs(beta)
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
            degrees: Math.floor(_abs_beta),
            minutes: Math.floor((_abs_beta - Math.floor(_abs_beta)) * 60)
        },
        north: beta > 0
    }
}
