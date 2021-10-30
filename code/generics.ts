import fs from "fs";

import { Difference, Epoch, Time } from "./types";
import { media_longitudo } from "./sun";


export function interpolate (array: Array<number>, x: number): number {
    const c = Math.floor(x)
    const delta = array[c + 1] - array[c]
    return array[c] + (x - c) * delta
}

export function acc (float: number, accuracy: number) {
    return parseFloat(float.toFixed(accuracy))
}

function JDN(time: Time): number {
    const a = Math.ceil((14 - time.month) / 12)
    const y = time.year + 4800 - a
    const m = time.month + 12 * a - 3
    return time.date + Math.ceil((153 * m + 2) / 5) + 365 * y + Math.ceil(y / 4) - 32083
}

export function dierum(time: Time, diff: Difference, era: Epoch): number {
    const jdn = JDN(time)
    const d = jdn - era.valueOf() + 1
    const h = time.hour + time.minute / 60
    const lon = diff.hours + diff.minutes / 60
    const corr_h = diff.east ? h - lon : h + lon
    const mof_d = corr_h / 24
    return d + mof_d
}

export function day_equation(d: number, a: number) {
    const day_data = JSON.parse(fs.readFileSync('./data/day.json').toString());

    // media longitudo Solis (mean longitude of Sun)
    const Lm = acc(media_longitudo(d), a)

    // equatione dierum (equation of day)
    return interpolate(day_data['g'], Lm)
}
