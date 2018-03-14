import {
    describe,
    it
} from "mocha";

import {
    expect
} from "chai";

import objectHelper, { // TODO: babel seems to explode when importing, can't find Object.keys()?
    map,
    filter
} from "../src/objectHelper";

describe("objectHelper tests", () => {
    describe("Standard object.map functionality", () => {
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

        it("file was read", () => {
            expect(1).to.equal(1);
        });

        it("Curried object", () => {
            const curried = objectHelper(testInput);

            expect(curried.map(multiplyNumberByThree)).to.equal(expectedOutput);
            expect(objectHelper(testInput).map(multiplyNumberByThree)).to.equal(expectedOutput);
        });

        it("Just the function", () => {
            expect(map(testInput)(multiplyNumberByThree)).to.equal(expectedOutput);
        });
    });

    describe("Object.map: bad input", () => {
        expect(objectHelper(null).map().to.throw());
        expect(objectHelper().map().to.throw());
        expect(objectHelper(null).map("this is an invalid param").to.throw());
    });

    describe("Standard object.filter functionality", () => {
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
            const curried = objectHelper(testInput);

            expect(curried.filter(filterAboveFive)).to.equal(expectedOutput);
            expect(objectHelper(testInput).filter(filterAboveFive)).to.equal(expectedOutput);
        });

        it("Just the function", () => {
            expect(filter(testInput)(filterAboveFive)).to.equal(expectedOutput);
        });

    });


});