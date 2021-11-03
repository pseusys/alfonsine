import { Epoch, Time, Difference, Precession } from "./code/types"
import { dierum } from "./code/utils"

import { precession_model } from "./code/sphere"
import { moon } from "./code/moon"
import { sun } from "./code/sun"
import { mercury } from "./code/mercury";
import { venus } from "./code/venus";
import { mars } from "./code/mars";
import { jupiter } from "./code/jupiter";
import { saturn } from "./code/saturn";


function alfonsine () {
    const date: Time = { year: 1473, month: 2, date: 19, hour: 4, minute: 48 }
    const era: Epoch = Epoch.CHRIST
    const diff: Difference = { hours: 2, minutes: 20, east: true }
    const accuracy = 5
    if (accuracy > 10) console.log("Warning! Maximum accuracy is 10, you are about to get unexpectedly inaccurate results!")
    const precession = Precession.TREPIDATION

    const d = dierum(date, diff, era)
    const p = precession_model(precession, d, accuracy)

    const SUN = sun(d, p, accuracy)
    const MOON = moon(d, accuracy)
    const MERCURY = mercury(d, p, accuracy)
    const VENUS = venus(d, p, accuracy)
    const MARS = mars(d, p, accuracy)
    const JUPITER = jupiter(d, p, accuracy)
    const SATURN = saturn(d, p, accuracy)
}

alfonsine();
