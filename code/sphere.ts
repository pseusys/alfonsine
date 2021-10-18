import fs from 'fs';

import { acc, interpolate } from "./generics";
import { Precession } from "./types";


export function precession_model(precession: Precession, d: number, a: number): number {
    switch (precession) {
        case Precession.PTOLEMY:
            return d / 36500

        case Precession.TREPIDATION:
            const sphere_data = JSON.parse(fs.readFileSync('./data/sphere.json').toString());
            const AeS = 0.00002 // TODO: implement calculations!
            const p0 = AeS * d
            const S8 = 359.21 // TODO: implement calculations!
            const AnR = 0.000141 // TODO: implement calculations!
            const p1 = AnR * d
            const sq = acc((S8 + p1) % 360, a)
            const p2 = interpolate(sphere_data['EAR'], sq)
            const EME = 0.12 // TODO: implement calculations!
            const p3 = p2 - EME
            return p0 + p3

        case Precession.TRUE:
            return d / (72 * 365.25)
    }
}
