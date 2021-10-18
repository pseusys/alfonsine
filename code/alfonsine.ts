import { dierum } from './generics'
import { precession_model } from './sphere'
import { sun } from "./sun";
import { Epoch, Time, Difference } from './types'



function alfonsine () {
    const date: Time = { year: 1473, month: 2, date: 19, hour: 4, minute: 48 }
    const era: Epoch = Epoch.CHRIST
    const diff: Difference = { hours: 0, minutes: 0, east: true }
    const accuracy = 5
    const precession = 2

    const d = dierum(date, diff, era)
    const p = precession_model(precession, d, accuracy)

    const s = sun(d, p, accuracy)
    console.log(s)
}

alfonsine();
// console.log(arr.split('\n').map((val: string) => { return val.split('\t')[1].replace(',', '.') }).reduce((prev: string, curr: string) => { return `${prev}, ${curr}` }, ""))
