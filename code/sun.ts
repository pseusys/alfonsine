import fs from "fs";

import { acc, interpolate } from "./generics";
import { Model, Zodiac } from "./types";


/**
 *
 * @param d time(t-t0)
 * @param p motum augi et trepidationis
 * @param a accuracy
 */
export function sun (d: number, p: number, a: number): Model {
    const sun_data = JSON.parse(fs.readFileSync('./data/sun.json').toString());

    // radix motus (mean longitude at epoch)
    const L0 = sun_data['l0']

    // media motus (rate of motion in mean longitude)
    const n = sun_data['n']

    // media motum (increment of longitude) = media motus * dierum
    const Ld = (n * d) % 360

    // media longitudo (mean longitude) = radix motus + media motum
    const Lm = (L0 + Ld) % 360

    // radix augi (longitude solar apogee at epoch)
    const La0 = sun_data['la0']

    // augi (longitude solar apogee) = radix augi + motum augi et trepidationis
    const La = (La0 + p) % 360

    // argumentum (true anomaly) = media longitudo - augi
    const A = acc((Lm - La) > 0 ? Lm - La : Lm - La + 360, a)

    // equationum (equation of center) = f(argumentum)
    const Q = interpolate(sun_data['f'], A)

    // verum motum (true ecliptic longitude) = media longitudo + equationum
    const L = Lm + Q

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
