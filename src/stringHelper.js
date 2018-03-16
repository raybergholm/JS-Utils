import {
    each
} from "./objectHelper";

const format = (template, replacements) => {
    if (replacements instanceof Array) {
        return template.replace(/\{\d+\}/g, (match) => replacements[match.substring(1, match.length - 1)] || match);
    } else if (replacements instanceof Object) {
        const result = template;

        return each(replacements, (reducer, entry) => {
            const regex = new RegExp(`{${entry}}`, "g");
            reducer = reducer.replace(regex, replacements[entry]);
        }, result);
    }
};

// TODO: punt these to test cases
// Functions mostly like String.Format() in other languages.
//
// Normal use cases (replacements is Array):
//  format("{0} {1}", ["Hello", "world"]) -> "Hello world"
//  format("hi {0}", ["Bob"]) -> "hi Bob"
//
// Normal use cases (replacements is an Object):
//  format("{first} {second}", {first: "hello", second: "world"});
//
// Weirder use cases:
//  format("{0} {1}", {0: "Hello", "1": "world"}) -> "Hello world"      - works because of how JS treats arrays, maps and objects
//  format("{0}{1}{4}{5}", "hello") -> "heo{5}"                         - works because [] is a legal operator on a string
//
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
function oldFormatRefactorThis(str, replacements) {
    if (replacements instanceof Array) {
        return str.replace(/\{\d+\}/g, function (match) {
            return replacements[match.substring(1, match.length - 1)] || match;
        });
    } else if (replacements instanceof Object) {
        var regex, prop, tempString;

        tempString = str;

        for (prop in replacements) {
            regex = new RegExp("{" + prop + "}", "g");
            tempString = tempString.replace(regex, replacements[prop]);
        }

        return tempString;
    }
}

export default {
    format
};