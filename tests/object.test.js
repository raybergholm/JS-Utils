import {
    describe,
    it
} from "mocha";
import {
    expect
} from "chai";

import objectUtils, {
    map,
    filter
} from "../src/object";

describe("Automated tests for JS-Utils--object.js", () => {

    it("Standard object.map functionality", () => {
        const testInput = {
            hi: 1,
            world: 2,
            i: 3,
            a: 4,
            test: 5
        };
        const expectedOutput = {
            hi: 3,
            world: 6,
            i: 9,
            a: 12,
            test: 15
        };

        const multiplyNumberByThree = input => input * 3;

        const curried = objectUtils(testInput);

        expect(curried.map(multiplyNumberByThree)).to.equal(expectedOutput);
        expect(objectUtils(testInput).map(multiplyNumberByThree)).to.equal(expectedOutput);
        expect(map(testInput)(multiplyNumberByThree)).to.equal(expectedOutput);
    });

    it("Object.map: bad input", () => {
        expect(objectUtils(null).map().to.throw());
        expect(objectUtils().map().to.throw());
        expect(objectUtils(null).map("this is an invalid param").to.throw());
    });

    it("Standard object.filter functionality", () => {
        const testInput = {
            hi: 12,
            world: 300,
            i: 1,
            a: 0.12,
            test: 16
        };
        const expectedOutput = {
            hi: 12,
            world: 300,
            test: 16
        };

        const filterAboveFive = input => input > 5;

        it("Curried object", () => {
            const curried = objectUtils(testInput);

            expect(curried.filter(filterAboveFive)).to.equal(expectedOutput);
            expect(objectUtils(testInput).filter(filterAboveFive)).to.equal(expectedOutput);

        });

        it("Filter function", () => {
            expect(filter(testInput)(filterAboveFive)).to.equal(expectedOutput);
        });

    });


});