import { acc, interpolate } from "./utils";

import { media_longitudo } from "./sun";

import * as data from "../data/generics.json"


export function day_equation(d: number, a: number) {
    // media longitudo Solis (mean longitude of Sun)
    const Lm = acc(media_longitudo(d), a)

    // equatione dierum (equation of day)
    return interpolate(data['f_g'], Lm)
}
