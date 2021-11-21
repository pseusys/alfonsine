import "../styles/simple.less"

import { alfonsine } from "../../code/api";


const SIMPLE_SIGNS = {
    "ARIES": "Ari",
    "TAURUS": "Tau",
    "GEMINI": "Gem",
    "CANCER": "Cnc",
    "LEO": "Leo",
    "VIRGO": "Vir",
    "LIBRA": "Lib",
    "SCORPIUS": "Sco",
    "SAGITTARIUS": "Sgr",
    "CAPRICORNUS": "Cap",
    "AQUARIUS": "Aqr",
    "PISCES": "Psc"
}


const form = document.getElementById("inp") as HTMLFormElement
const input = document.getElementById("calc") as HTMLButtonElement

const date = document.getElementById("date") as HTMLInputElement
const diff = document.getElementById("diff") as HTMLInputElement
const east = document.getElementById("east") as HTMLInputElement
const acc = document.getElementById("acc") as HTMLInputElement
const epoch = document.getElementById("epoch") as HTMLInputElement
const prec = document.getElementById("prec") as HTMLInputElement


function display (date_time: Date, diff_h: number, diff_m: number, east: boolean, acc: boolean, epoch: string, prec: string) {
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }
    const alf = alfonsine({
        date_time: date_time.getTime() / 1000,
        diff_hours: diff_h,
        diff_minutes: diff_m,
        east: east,
        accuracy: acc ? 0 : 10,
        epoch: epoch,
        precession: prec
    })

    for (let body of Object.keys(alf)) {
        document.getElementById(`astronomic_degrees_${body}`).textContent = alf[body].astronomic.degrees
        document.getElementById(`astronomic_minutes_${body}`).textContent = alf[body].astronomic.minutes
        document.getElementById(`astrologic_degrees_${body}`).textContent = alf[body].astrologic.degrees
        document.getElementById(`astrologic_minutes_${body}`).textContent = alf[body].astrologic.minutes
        document.getElementById(`sign_${body}`).textContent = SIMPLE_SIGNS[alf[body].sign]
        document.getElementById(`latitude_degrees_${body}`).textContent = alf[body].latitude.degrees
        document.getElementById(`latitude_minutes_${body}`).textContent = alf[body].latitude.minutes
        document.getElementById(`n_s_${body}`).textContent = alf[body].north != null ? (alf[body].north ? 'N' : 'S') : ''
    }
}


input.onclick = () => {
    const split = diff.value.split(':')
    display(new Date(date.value), Number(split[0]), Number(split[1]), east.checked, acc.checked, epoch.value, prec.value)
};
