import { Model } from "./types";
import { interpolate } from "./utils";

import { build_model, planeta } from "./generics";

import data from "../data/mercury.json"


/**
 * @param day time (t-t0)
 * @param precession verum motum continuo et verum motum accessus et recessus
 * @param accuracy accuracy
 */
export function mercury (day: number, precession: number , accuracy: number): Model {
    // equatum argumentum (true epicyclic anomaly), verum motum (true ecliptic longitude)
    const { equatum_centrum, equatum_argumentum, verum_motum } = planeta(data, day, precession, accuracy, true)

    // Latitude calculation:

    // constrained center 0 = equatum centrum prepared for interpolation with step 6
    const cc0 = equatum_centrum / 6

    // constrained center 180 = equatum centrum + 180 prepared for interpolation with step 6
    const cc180 = ((equatum_centrum + 180) % 360) / 6

    // constrained center 270 = equatum centrum + 270 prepared for interpolation with step 6
    const cc270 = ((equatum_centrum + 270) % 360) / 6

    // constrained argument = equatum argumentum prepared for interpolation with step 6
    const ca = equatum_argumentum / 6

    // declination = c3(constrained argument) * c5(constrained center 270) / 60
    const decl = interpolate(data['c3'], ca) * interpolate(data['c5'], cc270) / 60

    // reflection = c4(constrained argument / 6.3) * (equatum centrum >= 90 and equatum centrum < 270 ? 1.1 : 0.9) * c5(constrained center 180) / 60
    const refl = interpolate(data['c4'], ca) * (equatum_centrum >= 90 && equatum_centrum < 270 ? 1.1 : 0.9) * interpolate(data['c5'], cc180) / 60

    // third = 0.375 * (c5(constrained center 0) / 60) ^ 2
    const third = 0.375 * (interpolate(data['c5'], cc0) / 60) ** 2

    // latitude = declination + reflection + third
    const latitude = decl + refl + third

    return build_model(verum_motum, latitude)
}
