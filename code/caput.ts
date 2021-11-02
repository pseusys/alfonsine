import * as data from "../data/caput.json"


export function media_longitudo (day: number): number {
    // radix motus (mean longitude at epoch)
    const L0 = data['l0']

    // media motus (rate of motion in mean longitude)
    const n = data['n']

    // media motum (increment of longitude) = media motus * dierum
    const Ld = (n * day) % 360

    // media longitudo (mean longitude) = radix motus + media motum
    return (720 - L0 - Ld) % 360
}
