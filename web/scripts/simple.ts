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


type Input = {
    date_time: Date,
    diff: Date,
    east: boolean,
    acc: number,
    epoch: string,
    prec: string
}

function display (input: Input) {
    if (!form.checkValidity()) return

    let era, prec = null
    switch (input.epoch) {
        case "ALFONSO":
            era = Epoch.ALFONSO
            break
        case "CHRIST":
            era = Epoch.CHRIST
            break
        case "NABONASSAR":
            era = Epoch.NABONASSAR
            break
    }
    switch (input.prec) {
        case "PTOLEMY":
            prec = Precession.PTOLEMY
            break
        case "TREPIDATION":
            prec = Precession.TREPIDATION
            break
        case "TRUE":
            prec = Precession.TRUE
            break
    }

    const diff: Difference = { hours: input.diff.getHours(), minutes: input.diff.getMinutes(), east: input.east }
    const acc = input.acc

    if (acc < 1 || acc > 10) alert("Warning! Maximum accuracy is 10, you are about to get unexpectedly inaccurate results!")

    console.log(input.date_time, prec, diff, era, acc)

    const days = dierum(input.date_time, diff, era)
    const precession = precession_model(prec, days, acc)

    console.log(days, precession, acc)

    const bodies = {
        sun: sun(days, precession, acc),
        moon: moon(days, acc),
        mercury: mercury(days, precession, acc),
        venus: venus(days, precession, acc),
        mars: mars(days, precession, acc),
        jupiter: jupiter(days, precession, acc),
        saturn: saturn(days, precession, acc)
    }
    for (let body in bodies) {
        console.log(bodies[body])
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


input.onclick = () => display({
    date_time: new Date(date.value),
    diff: new Date(Number(diff.value.split(':')[0]), Number(diff.value.split(':')[1])),
    east: east.checked,
    acc: Number(acc.value),
    epoch: epoch.value,
    prec: prec.value,
});
