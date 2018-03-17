import {
    describe,
    it
} from "mocha";
import {
    expect
} from "chai";

import {format} from "../src/stringHelper";

describe("stringHelper tests", () => {
    describe("String formatting", () => {
        describe("Normal use cases", () => {
            it("Normal use case with an array", () => {
                expect(format("hi {0}", ["Bob"])).to.equal("hi Bob");
                expect(format("{0} {1}", ["Hello", "world"])).to.equal("Hello world");
            });
    
            it("Normal use case with an object", () => {
                expect(format("hi {name}", {name: "Bob"})).to.equal("hi Bob");
                expect(format("{first} {second}", {first: "Hello", second: "world"})).to.equal("Hello world");
            });
    
            it("Object keys are allowed to be numbers", () => {
                expect(format("{0} {1}", {0: "Hello", 1: "world"})).to.equal("Hello world");
            });
    
            it("String coercion", () => {
                expect(format("{0}{1}{4}{5}", "hello")).to.equal("heo{5}");
            });
        });
        
        describe("Partial matches, negative result cases", () => {
            it("Empty array, output === input", () => {
                expect(format("{0} {1}", [])).to.equal("{0} {1}");
            });

            it("Empty object, output === input", () => {
                expect(format("{0} {1}", {})).to.equal("{0} {1}");
            });
    
            it("Extraneous replacements gets ignored", () => {
                expect(format("{0}", ["Hello", "World"])).to.equal("Hello");
            });
    
            it("Extraneous tokens gets ignored", () => {
                expect(format("{0} {1}", ["Hello"])).to.equal("Hello {1}");
                expect(format("Hi {name}", {meaning: 42})).to.equal("Hi {name}");
            });
    
            it("Template has nothing to match, output === input", () => {
                expect(format("I will not be changed", ["Hello", "world"])).to.equal("I will not be changed");
                expect(format("I will not be changed", {greet: "Hello", subject: "world"})).to.equal("I will not be changed");
            });

            it("No corresponding replacement entry, token gets ignored", () => {
                expect(format("I will not be changed {2}", ["Hello", "world"])).to.equal("I will not be changed {2}");
            });
        });

        describe("Invalid use cases", () => {
            it("Integer for replacement, output === input", () => {
                expect(format("{0} {1}", 123)).to.equal("{0} {1}");
            });

            it("Array containing object, object coerces to string", () => {
                expect(format("{0}", [{}])).to.equal("[object Object]");
            });
        });
        
    });
});

// Functions mostly like String.Format() in other languages.

// Use cases with mismatches:
//  format("{0} {1}", ["gibberish"]) -> "gibberish {1}"     - {0} ok but {1} not matched
//  format("{2}", ["Hello", "world"]) -> "{2}"              - array doesn't contain that many elements
//  format("{0}", []) -> "{0}"                              - empty array, nothing will get matched
//  format("Hi there", ["Hello", "world"]) -> "Hi there"    - no match tokens: array doesn't matter then. String stays the same
//
// Results when you pass in wrong formats:
//  format("{0} {1}", {}) -> "{0} {1}"                              - empty object
//  format("{0} {1}", 123) -> "{0} {1}"                             - integer
//  format("{0}", [123]) -> "123"                                   - array with integer
//  format("{0}", [{}]) -> "[object Object]"                        - array with object object.toString() called
//  format({replace: function(){return "hi"}}, ["hello"]) -> "hi"   - ... ok, that's just evil. Don't do this
//
// Stuff that throws an error:
//  format()                        - undefined string (and array)
//  format("{0}")                   - undefined array
//  format({}, ["hello"])           - object isn't a string (no replace function)
//  format([], ["hello"]])          - array isn't a string (no replace function)
//  format(123, ["hello"]])         - integer isn't a string (no replace function)