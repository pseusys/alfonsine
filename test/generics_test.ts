import { expect } from "chai"
import { acc, day_equation, dierum, interpolate } from "../code/generics";
import { Difference, Epoch, Time } from "../code/types";


describe("Generics test", () => {
    const delta = 0.00000000009

    describe("Should interpolate a simple linear equation correctly", () => {
        const third = 1/3
        const middle = 0.25
        const f = [0, 0.5, 1]

        it(`f(0.5) should be equal to ${middle}`, () => {
            const res = interpolate(f, 0.5)
            expect(res).to.be.approximately(middle, delta)
        });
        it(`f(2/3) should be equal to ${third}`, () => {
            const res = interpolate(f, 2/3)
            expect(res).to.be.approximately(third, delta)
        });
    });

    describe("Should narrow down number to certain accuracy correctly", () => {
        const low = 5
        const high = 10
        const n_low = 3.14159
        const n_high = 3.1415926536

        it(`PI with accuracy ${low} should be equal to ${n_low}`, () => {
            const res = acc(Math.PI, low)
            expect(res).to.be.approximately(n_low, delta)
        });
        it(`PI with accuracy ${high} should be equal to ${n_high}`, () => {
            const res = acc(Math.PI, high)
            expect(res).to.be.approximately(n_high, delta)
        });
    });

    const d = 537698.1027777778
    describe("Should calculate JDN (julian day number) regarding geolocation and era correctly", () => {
        const date: Time = { year: 1473, month: 2, date: 19, hour: 4, minute: 48 }
        const diff: Difference = { hours: 2, minutes: 20, east: true }
        const era: Epoch = Epoch.CHRIST

        it(`JDN ${date} ${diff} ${era} should be equal to ${d}`, () => {
            const res = dierum(date, diff, era)
            expect(res).to.be.approximately(d, delta)
        });
    });

    describe("Should calculate day equation with given accuracy correctly", () => {
        const low = 5
        const high = 10
        const d_low = 0.0273837556
        const d_high = 0.0273837467

        it(`Day ${d} with accuracy ${low} should be equal to ${d_low}`, () => {
            const res = day_equation(d, low)
            expect(res).to.be.approximately(d_low, delta)
        });
        it(`Day ${d} with accuracy ${high} should be equal to ${d_high}`, () => {
            const res = day_equation(d, high)
            expect(res).to.be.approximately(d_high, delta)
        });
    });
});
