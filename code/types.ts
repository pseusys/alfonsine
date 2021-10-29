export type Zodiac = "ARIES" | "TAURUS" | "GEMINI" | "CANCER" | "LEO" | "VIRGO" | "LIBRA" | "SCORPIUS" | "SAGITTARIUS" | "CAPRICORNUS" | "AQUARIUS" | "PISCES"
const zodiacs = ["ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO", "LIBRA", "SCORPIUS", "SAGITTARIUS", "CAPRICORNUS", "AQUARIUS", "PISCES"]
export const Zodiac = {
    get ARIES(): Zodiac { return "ARIES"; },
    get TAURUS(): Zodiac { return "TAURUS"; },
    get GEMINI(): Zodiac { return "GEMINI"; },
    get CANCER(): Zodiac { return "CANCER"; },
    get LEO(): Zodiac { return "LEO"; },
    get VIRGO(): Zodiac { return "VIRGO"; },
    get LIBRA(): Zodiac { return "LIBRA"; },
    get SCORPIUS(): Zodiac { return "SCORPIUS"; },
    get SAGITTARIUS(): Zodiac { return "SAGITTARIUS"; },
    get CAPRICORNUS(): Zodiac { return "CAPRICORNUS"; },
    get AQUARIUS(): Zodiac { return "AQUARIUS"; },
    get PISCES(): Zodiac { return "PISCES"; },

    find (n: number): Zodiac { return zodiacs[n] as Zodiac },
    get (z: Zodiac): number { return zodiacs.findIndex((s: string) => { return s == z }) }
}


export enum Epoch {
    ALFONSO = 2178503, CHRIST = 1721424, NABONASSAR = 1448638
}

export enum Precession {
    PTOLEMY, TREPIDATION, TRUE
}

export interface Radial {
    degrees: number
    minutes: number
}

export interface Time {
    year: number
    month: number
    date: number
    hour: number
    minute: number
}

export interface Difference {
    hours: number
    minutes: number
    east: boolean
}

export interface Model {
    astronomic: Radial
    astrologic: Radial
    sign: Zodiac
    latitude: Radial
    north: boolean
}
