import {
    each
} from "./objectHelper";

// Format the template, replace anything in the template that corresponds an entry in replacements (either {numbers} for an array or {keys} for an object)
export const format = (template, replacements) => {
    if (replacements instanceof Array) {
        return template.replace(/\{\d+\}/g, (match) => replacements[match.substring(1, match.length - 1)] || match);
    } else if (replacements instanceof Object) {
        const result = template;

        return each(replacements, (reducer, entry) => {
            const regex = new RegExp(`{${entry}}`, "g");
            return reducer.replace(regex, replacements[entry]);
        }, result);
    } else {
        return template;
    }
};

export default {
    format
};