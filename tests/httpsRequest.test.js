import {
    describe,
    it
} from "mocha";
import {
    expect
} from "chai";

import httpsRequest, {
    request,
    options,
    get,
    head,
    post,
    put,
    patch,
    del
} from "../src/httpsRequest";

describe("httpsRequest tests", () => {
    describe("Testing using https://www.google.com", () => {
        const curried = httpsRequest("www.google.com");
        const result = curried.get();

        const readResponse = (response) => JSON.parse(response);

        const errorHandler = (error) => error;

        const response = result.then(readResponse).catch(errorHandler);

        it("Result should be a Promise", () => {
            expect(result).to.be.a("promise");
        });

        it("Response should be an object", () => {
            expect(response).to.be.an("object");
        });
    });

});