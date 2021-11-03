import { Model } from "./types";
import { acc, interpolate } from "./utils";

import { build_model } from "./generics";

import * as data from "../data/sun.json"


/**
 * @param day time(t-t0)
 * @param precession motum augi et trepidationis
 * @param accuracy accuracy
 */
export function sun (day: number, precession: number, accuracy: number): Model {
    // media longitudo (mean longitude)
    const Lm = media_longitudo(day)

    // radix augi (longitude solar apogee at epoch)
    const La0 = data['la0']

    // augi (longitude solar apogee) = radix augi + motum augi et trepidationis
    const La = (La0 + precession) % 360

    // argumentum (true anomaly) = media longitudo - augi
    const A = acc((Lm - La + 360) % 360, accuracy)

    // equationum (equation of center) = f(argumentum)
    const Q = interpolate(data['f_a'], A)

    // verum motum (true ecliptic longitude) = media longitudo + equationum
    const L = Lm + Q

    return build_model(L, null)
}

export function media_longitudo (day: number): number {
    // radix motus (mean longitude at epoch)
    const L0 = data['l0']

    // media motus (rate of motion in mean longitude)
    const n = data['n']

    // media motum (increment of longitude) = media motus * dierum
    const Ld = (n * day) % 360

    // media longitudo (mean longitude) = radix motus + media motum
    return (L0 + Ld) % 360
}
