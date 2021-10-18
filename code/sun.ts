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
    const L0 = 278.35 // TODO: implement calculations!

    // media motus (rate of motion in mean longitude)
    const n = 0.99 // TODO: implement calculations!

    // media motum (increment of longitude) = media motus * dierum
    const Ld = (n * d) % 360

    // media longitudo (mean longitude) = radix motus + media motum
    const Lm = (L0 + Ld) % 360

    // radix augi (longitude solar apogee at epoch)
    const La0 = 71.42 // TODO: implement calculations!

    // augi (longitude solar apogee) = radix augi + motum augi et trepidationis
    const La = (La0 + p) % 360

    // argumentum (true anomaly) = media longitudo - augi
    const A = acc((Lm - La) > 0 ? Lm - La : Lm - La + 360, a)

    // equationum (equation of center) = f(argumentum)
    const Q = interpolate(sun_data['f'], A)

    // verum motum (true ecliptic longitude) = media longitudo + equationum
    const L = Lm + Q

    const Lc = Math.ceil(L);
    return {
        longitude1: {
            degrees: Lc,
            minutes: Math.ceil((Lc - L) * 60)
        },
        longitude2: {
            degrees: Lc - Math.ceil(Lc / 30) * 30,
            minutes: Math.ceil((Lc - L) * 60)
        },
        sign: Zodiac.find(Math.ceil(Lc / 30) + 1),
        latitude: {
            degrees: 0,
            minutes: 0
        },
        north: undefined
    }
}
