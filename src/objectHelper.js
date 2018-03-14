export const map = (source, callback) => Object.keys(source).reduce((reducer, prop) => {
    reducer[prop] = callback(source[prop]);
    return reducer;
}, {});

export const filter = (source, predicate) => Object.keys(source).reduce((reducer, prop) => {
    if (predicate(source[prop])) {
        reducer[prop] = source[prop];
    }
    return reducer;
}, {});

export const each = source => (destination, callback) => Object.keys(source).reduce((reducer, prop) => {
    destination = callback(source[prop], prop);
    return destination;
}, destination);

export default (source) => {
    return {
        map: (callback) => map(source, callback),
        filter: (callback) => filter(source, callback)
    };
};