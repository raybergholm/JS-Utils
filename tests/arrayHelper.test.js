import {
    describe,
    it
} from "mocha";
import {
    expect
} from "chai";

import {
    intersection as intersect,
    leftDifference as leftDiff,
    rightDifference as rightDiff,
    symmetricalDifference as symmDiff
} from "../src/arrayHelper";

describe("arrayHelper tests", () => {
    describe("Array diff tests", () => {
        describe("Primitive types using default comparator", () => {
            const left = [1,2,3];
            const right = [2,3,4];

            it("Return value is an array", () => {
                expect(leftDiff(left, left)()).to.be.an("array");
            });

            it("Same array contents return empty array", () => {
                expect(leftDiff(left, left)()).to.be.an("array").that.has.lengthOf(0);
            });

            it("intersection returns common items", () => {
                expect(intersect(left, right)()).to.be.an("array").that.has.lengthOf(2).and.contains(2).and.contains(3);
            });

            it("left difference returns left unique items", () => {
                expect(leftDiff(left, right)()).to.be.an("array").that.has.lengthOf(1).and.contains(1);
            });

            it("right difference returns right unique items", () => {
                expect(rightDiff(left, right)()).to.be.an("array").that.has.lengthOf(1).and.contains(4);
            });

            it("symmetrical difference returns both sets", () => {
                expect(symmDiff(left, right)()).to.be.an("array").that.has.lengthOf(2).and.contains(1).and.contains(4);
            });
        });

        describe("Object typing with custom comparator", () => {
            const item1 = {id: 1, payload: "hi"};
            const item2 = {id: 2, payload: "world"};
            const item3 = {id: 3, payload: "Bob"};
            const item4 = {id: 4, payload: "Alice"};

            const left = [item1, item2, item3];
            const right = [item2, item3, item4];

            const comparator = (left, right) => left.id === right.id;

            it("Return value is an array", () => {
                expect(leftDiff(left, left)(comparator)).to.be.an("array");
            });

            it("Same array contents return empty array", () => {
                expect(leftDiff(left, left)(comparator)).to.be.an("array").that.has.lengthOf(0);
            });

            it("intersection returns common items", () => {
                expect(intersect(left, right)(comparator)).to.be.an("array").that.has.lengthOf(2).and.contains(item2).and.contains(item3);
            });

            it("left difference returns left unique items", () => {
                expect(leftDiff(left, right)(comparator)).to.be.an("array").that.has.lengthOf(1).and.contains(item1);
            });

            it("right difference returns right unique items", () => {
                expect(rightDiff(left, right)(comparator)).to.be.an("array").that.has.lengthOf(1).and.contains(item4);
            });

            it("symmetrical difference returns both sets", () => {
                expect(symmDiff(left, right)(comparator)).to.be.an("array").that.has.lengthOf(2).and.contains(item1).and.contains(item4);
            });
        });
    });
});