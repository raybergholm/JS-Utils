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
    describe("Normal use cases", () => {
        describe("Map", () => {
            const testInput = {
                hi: 1,
                world: 2,
                i: 3,
                am: 4,
                testing: 5
            };
            const expectedOutput = {
                hi: 3,
                world: 6,
                i: 9,
                am: 12,
                testing: 15
            };
            const expectedOutputValues = Object.values(expectedOutput);

            const multiplyNumberByThree = input => input * 3;

            describe("Curried object", () => {
                const curried = objectHelper(testInput);
                const result = curried.map(multiplyNumberByThree);

                it("Return value is an object", () => {
                    expect(result).to.be.an("object");
                });

                it("Returned object keys remain the same", () => {
                    expect(result).to.be.an("object").and.have.all.keys("hi", "world", "i", "am", "testing");
                });

                it("Return object values are correct", () => {
                    expect(Object.values(result)).to.have.members(expectedOutputValues);
                });
            });

            describe("Standalone function", () => {
                const result = map(testInput, multiplyNumberByThree);

                it("Return value is an object", () => {
                    expect(result).to.be.an("object");
                });

                it("Returned object keys remain the same", () => {
                    expect(result).to.be.an("object").and.have.all.keys("hi", "world", "i", "am", "testing");
                });

                it("Return object values are correct", () => {
                    expect(Object.values(result)).to.have.members(expectedOutputValues);
                });
            });
        });

        describe("Filter", () => {
            const testInput = {
                hi: 12,
                world: 300,
                i: 5,
                am: 0.12,
                testing: 16
            };
            const expectedOutput = {
                hi: 12,
                world: 300,
                testing: 16
            };
            const expectedOutputValues = Object.values(expectedOutput);

            const filterAboveFive = input => input > 5;

            describe("Curried object", () => {
                const curried = objectHelper(testInput);
                const result = curried.filter(filterAboveFive);

                it("Return value is an object", () => {
                    expect(result).to.be.an("object");
                });

                it("Returned object keys are filtered correctly", () => {
                    expect(result).to.be.an("object").and.have.all.keys("hi", "world", "testing");
                });

                it("Returned object values remain the same", () => {
                    expect(Object.values(result)).to.have.members(expectedOutputValues);
                });
            });

            describe("Standalone function", () => {
                const result = filter(testInput, filterAboveFive);

                it("Return value is an object", () => {
                    expect(result).to.be.an("object");
                });

                it("Returned object keys are filtered correctly", () => {
                    expect(result).to.be.an("object").and.have.all.keys("hi", "world", "testing");
                });

                it("Returned object values remain the same", () => {
                    expect(Object.values(result)).to.have.members(expectedOutputValues);
                });
            });
        });
    });

    describe("Bad input", () => {
        const testInput = {
            hi: 1,
            world: 2,
            i: 3,
            am: 4,
            testing: 5
        };

        const badCallback = () => {};

        describe("Map", () => {
            it("Valid object with bad callback (no return value): same keys, undefined values", () => {
                const result = objectHelper(testInput).map(badCallback);
                expect(result).to.be.an("object").and.have.all.keys("hi", "world", "i", "am", "testing");
                expect(Object.values(result)).to.have.members([undefined, undefined, undefined, undefined, undefined]); // eslint-disable-line no-undefined
            });

            it("Empty object always returns empty", () => {
                const propertyOverwriter = () => "this input was changed"; 

                const result = objectHelper({}).map(propertyOverwriter);
                expect(result).to.be.an("object");
                expect(Object.values(result)).to.be.empty;
            });

            it("Valid object with invalid callback should throw", () => {
                const curried = objectHelper(testInput);
                expect(() => curried.map()).to.throw(TypeError);
                expect(() => curried.map("this is an invalid param")).to.throw(TypeError);
                expect(() => curried.map({})).to.throw(TypeError);
                expect(() => curried.map([])).to.throw(TypeError);
            });

            it("Invalid object should throw", () => {
                expect(() => objectHelper(null).map()).to.throw(TypeError);
                expect(() => objectHelper().map()).to.throw(TypeError);
                expect(() => objectHelper("this is an invalid param").map("this is also invalid")).to.throw(TypeError);
            });

            it("Array input: converts to object with numeric keys, values affected by callback", () => {
                const testInput = [
                    "arrays",
                    "do",
                    "their",
                    "own",
                    "thing"
                ];
                const expectedOutput = [
                    "ARRAYS",
                    "DO",
                    "THEIR",
                    "OWN",
                    "THING"
                ];
                const uppercase = (input) => input.toUpperCase();
                const result = map(testInput, uppercase);
                expect(result).to.be.an("object").and.have.all.keys("0", "1", "2", "3", "4");
                expect(Object.values(result)).to.have.members(expectedOutput);
            });

            it("Empty arrays coerces to empty object", () => {
                const alwaysTrue = () => true;
                const result = map([], alwaysTrue);

                expect(result).to.be.an("object");
                expect(Object.values(result)).to.be.empty;
            });
        });

        describe("Filter", () => {
            it("Valid object with bad callback (no return value): empty object", () => {
                const result = objectHelper(testInput).filter(badCallback);
                expect(result).to.be.an("object");
                expect(Object.values(result)).to.be.empty;
            });

            it("Empty object always returns empty", () => {
                const alwaysTrue = () => true;
                const result = filter({}, alwaysTrue);

                expect(result).to.be.an("object");
                expect(Object.values(result)).to.be.empty;
            });

            it("Valid object with invalid callback should throw", () => {
                const curried = objectHelper(testInput);
                expect(() => curried.filter()).to.throw(TypeError);
                expect(() => curried.filter("this is an invalid param")).to.throw(TypeError);
                expect(() => curried.filter({})).to.throw(TypeError);
                expect(() => curried.filter([])).to.throw(TypeError);
            });

            it("Invalid object should throw", () => {
                expect(() => objectHelper(null).filter()).to.throw(TypeError);
                expect(() => objectHelper().filter()).to.throw(TypeError);
                expect(() => objectHelper("this is an invalid param").filter("this is also invalid")).to.throw(TypeError);
            });

            it("Array input: converts to object with numeric keys, values untouched", () => {
                const testInput = [
                    "arrays",
                    "do",
                    "their",
                    "own",
                    "thing"
                ];
                const alwaysTrue = () => true;
                const result = filter(testInput, alwaysTrue);
                
                expect(result).to.be.an("object").and.have.all.keys("0", "1", "2", "3", "4");
                expect(Object.values(result)).to.have.members(testInput);
            });

            it("Empty arrays coerces to empty object", () => {
                const alwaysTrue = () => true;
                const result = filter([], alwaysTrue);

                expect(result).to.be.an("object");
                expect(Object.values(result)).to.be.empty;
            });
        });
    });
});