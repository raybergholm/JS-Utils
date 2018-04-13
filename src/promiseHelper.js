function PromiseResult(fulfilled, value) {
    return {
        isFulfilled: () => fulfilled,
        isRejected: () => !fulfilled,
        isPending: () => false,
        value: () => {
            if (!fulfilled) {
                throw new Error("Illegal operation .value() on a rejected promise");
            }
            return value;
        },
        reason: () => {
            if (fulfilled) {
                throw new Error("Illegal operation .reason() on a fulfilled promise");
            }
            return value;
        }
    };
}

const allFulfills = (promiseResults) => promiseResults.reduce((reducer, promiseResult) => {
    if (promiseResult.isFulfilled()) {
        reducer.push(promiseResult.value());
    }
    return reducer;
}, []);

const allRejects = (promiseResults) => promiseResults.reduce((reducer, promiseResult) => {
    if (promiseResult.isRejected()) {
        reducer.push(promiseResult.reason());
    }
    return reducer;
}, []);

const allSettled = (promises) => Promise.all(promises.map((promise) =>
    Promise.resolve(promise).then((result) => new PromiseResult(true, result), (error) => new PromiseResult(false, error))
));

export default {
    allSettled,
    allFulfills,
    allRejects
};