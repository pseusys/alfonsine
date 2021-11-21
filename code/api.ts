import { Difference, Epoch, Model, Precession } from "./types";
import { dierum } from "./utils";

import { sun } from "./sun";
import { moon } from "./moon";
import { mercury } from "./mercury";
import { venus } from "./venus";
import { mars } from "./mars";
import { jupiter } from "./jupiter";
import { saturn } from "./saturn";
import { precession_model } from "./sphere";


export interface Input {
    date_time: number,
    diff_hours: number,
    diff_minutes: number,
    east: boolean,
    accuracy: number,
    epoch: string,
    precession: string
}

export function isInput (input: any): input is Input {
    return typeof input.date_time === 'number' &&
        typeof input.diff_hours === 'number' &&
        typeof input.diff_minutes === 'number' &&
        typeof input.east === 'boolean' &&
        typeof input.accuracy === 'number' &&
        typeof input.epoch === 'string' &&
        typeof input.precession === 'string'
}

export interface Output {
    sun: Model,
    moon: Model,
    mercury: Model,
    venus: Model,
    mars: Model,
    jupiter: Model,
    saturn: Model
}

export function alfonsine (input: Input): Output {
    const accuracy: number = input.accuracy
    const difference: Difference = { hours: input.diff_hours, minutes: input.diff_minutes, east: input.east }
    const days: number = dierum(new Date(input.date_time * 1000), difference, Epoch[input.epoch])
    const precession: number = precession_model(Precession[input.precession], days, accuracy)

    return {
        sun: sun(days, precession, accuracy),
        moon: moon(days, accuracy),
        mercury: mercury(days, precession, accuracy),
        venus: venus(days, precession, accuracy),
        mars: mars(days, precession, accuracy),
        jupiter: jupiter(days, precession, accuracy),
        saturn: saturn(days, precession, accuracy)
    }
}
