import fs from "fs";

export function media_longitudo (d: number): number {
    const caput_data = JSON.parse(fs.readFileSync('./data/caput.json').toString());

    // radix motus (mean longitude at epoch)
    const L0 = caput_data['l0']

    // media motus (rate of motion in mean longitude)
    const n = caput_data['n']

    // media motum (increment of longitude) = media motus * dierum
    const Ld = (n * d) % 360

    // media longitudo (mean longitude) = radix motus + media motum
    return (720 - L0 - Ld) % 360
}
