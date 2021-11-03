import { Model } from "./types";
import { interpolate } from "./utils";

import { build_model, planeta } from "./generics";

import data from "../data/jupiter.json";


export function jupiter (day: number, precession: number , accuracy: number): Model {
    // equatum argumentum (true epicyclic anomaly), verum motum (true ecliptic longitude)
    const { equatum_centrum, equatum_argumentum, verum_motum } = planeta(data, day, precession, accuracy, false)

    // Latitude calculation:

    // constrained center 20 = equatum centrum - 20 prepared for interpolation with step 6
    const cc20 = ((equatum_centrum + 340) % 360) / 6

    // constrained argument = equatum argumentum prepared for interpolation with step 6
    const ca = equatum_argumentum / 6

    // latitude = declination + reflection + third
    const beta = interpolate(data['c5'], cc20) / 60 * (cc20 >= 15 && cc20 < 45 ? interpolate(data['c3'], ca) : interpolate(data['c4'], ca))

    return build_model(verum_motum, beta)
}
