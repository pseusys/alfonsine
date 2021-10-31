import { Model, Zodiac } from "./types";
import { acc, interpolate } from "./utils";

import * as data from "../data/sun.json"


/**
 * @param d time(t-t0)
 * @param p motum augi et trepidationis
 * @param a accuracy
 */
export function sun (d: number, p: number, a: number): Model {
    // media longitudo (mean longitude)
    const Lm = media_longitudo(d)

    // radix augi (longitude solar apogee at epoch)
    const La0 = data['la0']

    // augi (longitude solar apogee) = radix augi + motum augi et trepidationis
    const La = (La0 + p) % 360

    // argumentum (true anomaly) = media longitudo - augi
    const A = acc((Lm - La + 360) % 360, a)

    // equationum (equation of center) = f(argumentum)
    const Q = interpolate(data['f_a'], A)

    // verum motum (true ecliptic longitude) = media longitudo + equationum
    const L = Lm + Q

    // Building Model:

    const _L_floor = Math.floor(L)
    const _minutes = Math.round((L - _L_floor) * 60)
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
            degrees: 0,
            minutes: 0
        },
        north: undefined
    }
}

export function media_longitudo (d: number): number {
    // radix motus (mean longitude at epoch)
    const L0 = data['l0']

    // media motus (rate of motion in mean longitude)
    const n = data['n']

    // media motum (increment of longitude) = media motus * dierum
    const Ld = (n * d) % 360

    // media longitudo (mean longitude) = radix motus + media motum
    return (L0 + Ld) % 360
}
