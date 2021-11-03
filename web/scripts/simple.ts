import "../styles/simple.less"

import { Difference, Epoch, Precession } from "../../code/types";
import { sun } from "../../code/sun";
import { moon } from "../../code/moon";
import { mercury } from "../../code/mercury";
import { venus } from "../../code/venus";
import { mars } from "../../code/mars";
import { jupiter } from "../../code/jupiter";
import { saturn } from "../../code/saturn";
import { dierum } from "../../code/utils";
import { precession_model } from "../../code/sphere";


const form = document.getElementById("inp") as HTMLFormElement
const input = document.getElementById("calc") as HTMLButtonElement

const date = document.getElementById("date") as HTMLInputElement
const diff = document.getElementById("diff") as HTMLInputElement
const east = document.getElementById("east") as HTMLInputElement
const acc = document.getElementById("acc") as HTMLInputElement
const epoch = document.getElementById("epoch") as HTMLInputElement
const prec = document.getElementById("prec") as HTMLInputElement


function display (date_time: Date, diff: Date, east: boolean, acc: boolean, epoch: number, prec: string) {
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }

    const accuracy = acc ? 10 : 0
    const difference: Difference = { hours: diff.getHours(), minutes: diff.getMinutes(), east: east }
    const days = dierum(date_time, difference, Epoch.find(epoch))
    const precession = precession_model(Precession[prec], days, accuracy)

    const bodies = {
        sun: sun(days, precession, accuracy),
        moon: moon(days, accuracy),
        mercury: mercury(days, precession, accuracy),
        venus: venus(days, precession, accuracy),
        mars: mars(days, precession, accuracy),
        jupiter: jupiter(days, precession, accuracy),
        saturn: saturn(days, precession, accuracy)
    }
    for (let body in bodies) {
        document.getElementById(`astronomic_degrees_${body}`).textContent = bodies[body].astronomic.degrees
        document.getElementById(`astronomic_minutes_${body}`).textContent = bodies[body].astronomic.minutes
        document.getElementById(`astrologic_degrees_${body}`).textContent = bodies[body].astrologic.degrees
        document.getElementById(`astrologic_minutes_${body}`).textContent = bodies[body].astrologic.minutes
        document.getElementById(`sign_${body}`).textContent = bodies[body].sign
        document.getElementById(`latitude_degrees_${body}`).textContent = bodies[body].latitude.degrees
        document.getElementById(`latitude_minutes_${body}`).textContent = bodies[body].latitude.minutes
        document.getElementById(`n_s_${body}`).textContent = bodies[body].north
    }
}


input.onclick = () => {
    const split = diff.value.split(':')
    display(new Date(date.value), new Date(Number(split[0]), Number(split[1])), east.checked, acc.checked, Number(epoch.value), prec.value)
};
