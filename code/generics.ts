import { Difference, Epoch, Time } from "./types";


export function interpolate (array: Array<number>, x: number): number {
    const c = Math.ceil(x)
    const delta = array[c + 1] - array[c]
    return array[c] - (x - c) * delta
}

export function acc (float: number, accuracy: number) {
    return parseFloat(float.toFixed(accuracy))
}

export function JDN(time: Time): number {
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
