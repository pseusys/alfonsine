import { Model } from "./types";
import { interpolate } from "./utils";

import { build_model, planeta } from "./generics";

import data from "../data/mars.json";


export function mars (day: number, precession: number , accuracy: number): Model {
    // equatum argumentum (true epicyclic anomaly), verum motum (true ecliptic longitude)
    const { equatum_centrum, equatum_argumentum, verum_motum } = planeta(data, day, precession, accuracy, false)

    // Latitude calculation:

    // constrained center 0 = equatum centrum prepared for interpolation with step 6
    const cc0 = equatum_centrum / 6

    // constrained argument = equatum argumentum prepared for interpolation with step 6
    const ca = equatum_argumentum / 6

    // latitude = declination + reflection + third
    const beta = interpolate(data['c5'], cc0) / 60 * (cc0 >= 15 && cc0 < 45 ? interpolate(data['c3'], ca) : interpolate(data['c4'], ca))

    return build_model(verum_motum, beta)
}
