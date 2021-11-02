import { Precession } from "./types";
import { acc, interpolate } from "./utils";

import * as data from "../data/sphere.json"


/**
 * @param precession precession type
 * @param day time (t-t0)
 * @param accuracy accuracy
 */
export function precession_model(precession: Precession, day: number, accuracy: number): number {
    switch (precession) {
        case Precession.PTOLEMY:
            // Ptolemy precession: 1 degree per century
            return day / 36500

        case Precession.TREPIDATION:
            // radix motus octaue sphere (mean longitude at epoch)
            const l0 = data['l0']

            // medij augium et stellarum fixarum (rate of linear motion per 49000 years)
            const n = data['n']

            // medij motus accesius at recessus octaue sphere (rate of trepidation per 7000 years)
            const n1 = data['n1']

            // media motum augi (linear displacement of apogees)
            const p0 = n * day

            // media motum octaue sphere (displacement due to trepidation)
            const p1 = n1 * day

            // eius motus est (position on the trepidation sine wave)
            const EME = data['eme']

            // motum octaue sphere (displacement of the eighth sphere)
            const lm = acc((l0 + p1) % 360, accuracy)

            // aequationum motus accessus at recessus sphaere stellate (equalization of the eighth sphere)
            const p2 = interpolate(data['q_lm'], lm)

            // verum motum accessus et recessus (true ecliptic longitude)
            const p3 = p2 - EME

            // Trepidation precession: linear 360 degrees per 49000 years + 9 degrees per 7000 years
            return p0 + p3

        case Precession.TRUE:
            // Close to true precession: 1 degree per 72 years
            return day / (72 * 365.25)
    }
}
