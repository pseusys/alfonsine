import { dierum } from './code/generics'
import { precession_model } from './code/sphere'
import { Epoch, Time, Difference, Precession } from './code/types'
import { moon } from "./code/moon";
import { sun } from "./code/sun";


function alfonsine () {
    const date: Time = { year: 1473, month: 2, date: 19, hour: 4, minute: 48 }
    const era: Epoch = Epoch.CHRIST
    const diff: Difference = { hours: 2, minutes: 20, east: true }
    const accuracy = 5
    if (accuracy > 10) console.log("Warning! Maximum accuracy is 10, you are about to get unexpectedly inaccurate results!")
    const precession = Precession.TREPIDATION

    const d = dierum(date, diff, era)
    const p = precession_model(precession, d, accuracy)

    const s = sun(d, p, accuracy)
    const m = moon(d, accuracy)
    console.log(s, m)
}

alfonsine();

/*
const arr = ""
console.log(arr.split('\n').map((val: string) => { return val.split('\t')[0].replace(',', '.') }).reduce((prev: string, curr: string) => { return `${prev}, ${curr}` }, ""))
*/
