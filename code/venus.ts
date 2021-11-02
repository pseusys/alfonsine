import { Model } from "./types";
import { interpolate } from "./utils";
import { build_model, proxima } from "./generics";

import * as data from "../data/venus.json";


export function venus (day: number, precession: number , accuracy: number): Model {
    // equatum argumentum (true epicyclic anomaly), verum motum (true ecliptic longitude)
    const { equatum_centrum, equatum_argumentum, verum_motum } = proxima(data, day, precession, accuracy)

    // Latitude calculation:

    // constrained center 0 = equatum centrum prepared for interpolation with step 6
    const cc0 = equatum_centrum / 6

    // constrained center 90 = equatum centrum + 90 prepared for interpolation with step 6
    const cc90 = ((equatum_centrum + 90) % 360) / 6
    
    // constrained argument = equatum argumentum prepared for interpolation with step 6
    const ca = equatum_argumentum / 6

    // declination = c3(constrained argument) * c5(constrained center 90) / 60
    const decl = interpolate(data['c3'], ca) * interpolate(data['c5'], cc90) / 60

    // reflection = c4(constrained argument) * c5(constrained center 0) / 60
    const refl = interpolate(data['c4'], ca) * interpolate(data['c5'], cc0) / 60

    // third = 1/6 * (c5(constrained center 0) / 60) ^ 2
    const third = 1/6 * (interpolate(data['c5'], cc0) / 60) ** 2

    // latitude = declination + reflection + third
    const latitude = decl + refl + third

    return build_model(verum_motum, latitude)
}
