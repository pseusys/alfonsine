import { expect } from "chai"

import { day_equation } from "../code/generics";


describe("Generics test", () => {
    const d = 537698.102777777777778

    const delta = 0.00000000009

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
