import fs from "fs";

import { acc, day_equation, interpolate } from "./generics";
import { Model, Zodiac } from "./types";
import { media_longitudo as sun_longitudo } from "./sun";
import { media_longitudo as caput_longitudo } from "./caput";


/**
 * @param d time(t-t0)
 * @param p motum augi et trepidationis
 * @param a accuracy
 */
export function moon (d: number, p: number, a: number): Model {
    const moon_data = JSON.parse(fs.readFileSync('./data/moon.json').toString());

    // radix motus (mean longitude at epoch)
    const L0 = moon_data['l0']

    // media motus (rate of motion in mean longitude)
    const n = moon_data['n']

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
    const A0 = moon_data['a0']

    // medij argumentis (rate of motion in mean anomaly) // TODO: add calculation
    const m = moon_data['m']

    // media motum argumentis (increment of anomaly)
    const Ad = (m * _d) % 360

    // media argumentum (mean anomaly)
    const Am = (A0 + Ad) % 360

    // equatio centris (equalization of the mean anomaly)
    const c3 = interpolate(moon_data['c3'], D2)

    // argumentum (true anomaly)
    const A = acc((Am + c3) % 360, a)

    // equatio primo examinata (equalization of the excentricity anomaly)
    const c4 = interpolate(moon_data['c4'], A)

    // diuersitas diametry (excess epicyclic anomaly)
    const c5 = interpolate(moon_data['c5'], A)

    // minuta proportionalis (proportionality coefficient)
    const c6 = interpolate(moon_data['c6'], D2)

    // equatio secundo examinata (second equalization of the anomaly) = equatio primo examinata + diuersitas diametry * minuta proportionalis / 60
    const c = c4 + c5 * c6 / 60

    // verum locum Lune (true ecliptic longitude) = media longitudo Lune + equatio secundo examinata
    const L = (LmM + c) % 360

    const caput = caput_longitudo(d);
    const omega = (L - caput + 360) % 360
    const beta = interpolate(moon_data['b'], omega)

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
