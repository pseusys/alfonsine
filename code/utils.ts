import { Difference, Epoch } from "./types";


export function interpolate (array: Array<number>, x: number): number {
    const c = Math.floor(x)
    const delta = array[c == array.length - 1 ? 0 : c + 1] - array[c]
    return array[c] + (x - c) * delta
}

export function acc (float: number, accuracy: number) {
    return parseFloat(float.toFixed(accuracy))
}

function JDN(time: Date): number {
    const a = Math.ceil((14 - (time.getMonth() + 1)) / 12)
    const y = time.getFullYear() + 4800 - a
    const m = (time.getMonth() + 1) + 12 * a - 3
    return time.getDate() + Math.ceil((153 * m + 2) / 5) + 365 * y + Math.ceil(y / 4) - 32083
}

export function dierum(time: Date, diff: Difference, era: Epoch): number {
    const jdn = JDN(time)
    const d = jdn - era.valueOf() + 1
    const h = time.getHours() + time.getMinutes() / 60
    const lon = diff.hours + diff.minutes / 60
    const corr_h = diff.east ? h - lon : h + lon
    const mof_d = corr_h / 24
    return d + mof_d
}
