import { Model } from "./types";
import { interpolate } from "./utils";

import { build_model, planeta } from "./generics";

import * as data from "../data/saturn.json";


export function saturn (day: number, precession: number , accuracy: number): Model {
    // equatum argumentum (true epicyclic anomaly), verum motum (true ecliptic longitude)
    const { equatum_centrum, equatum_argumentum, verum_motum } = planeta(data, day, precession, accuracy, false)

    // Latitude calculation:

    // constrained center 50 = equatum centrum + 50 prepared for interpolation with step 6
    const cc50 = ((equatum_centrum + 50) % 360) / 6

    // constrained argument = equatum argumentum prepared for interpolation with step 6
    const ca = equatum_argumentum / 6

    // latitude = declination + reflection + third
    const beta = interpolate(data['c5'], cc50) / 60 * (cc50 >= 15 && cc50 < 45 ? interpolate(data['c3'], ca) : interpolate(data['c4'], ca))

    return build_model(verum_motum, beta)
}
