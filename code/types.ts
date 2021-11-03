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

    find (n: number): Zodiac { return Zodiac[zodiacs[n]] }
}


export type Epoch = 2178503 | 1721424 | 1448638
const epochs = { 2178503: "ALFONSO", 1721424: "CHRIST", 1448638: "NABONASSAR" }
export const Epoch = {
    get ALFONSO(): Epoch { return 2178503; },
    get CHRIST(): Epoch { return 1721424; },
    get NABONASSAR(): Epoch { return 1448638; },

    find (n: number): Epoch { return Epoch[epochs[n]] }
}

export type Precession = "PTOLEMY" | "TREPIDATION" | "TRUE"
const precessions = ["PTOLEMY", "TREPIDATION", "TRUE"]
export const Precession = {
    get PTOLEMY(): Precession { return "PTOLEMY"; },
    get TREPIDATION(): Precession { return "TREPIDATION"; },
    get TRUE(): Precession { return "TRUE"; },

    find (n: number): Precession { return Precession[precessions[n]] }
}


export interface Radial {
    degrees: number
    minutes: number
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
