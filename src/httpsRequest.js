import * as https from "https";

const DEFAULT_PORT = 443;

export const DEFAULT_HEADERS = {
    CONTENT_JSON: {
        "Content-Type": "application/json"
    },
    CONTENT_XML: {
        "Content-Type": "application/xml"
    }
};

const createOptions = (hostname, path, method, port = DEFAULT_PORT, headers = DEFAULT_HEADERS) => ({
    hostname,
    port,
    path,
    method,
    headers
});

export const request = (hostname, path = "", method, payload = null, port = DEFAULT_PORT, headers = DEFAULT_HEADERS.CONTENT_JSON) => {
    const options = createOptions(hostname, encodeURI(path), method, port, headers);

    return new Promise((resolve, reject) => {
        const successCallback = (response) => {
            let str = "";
            response.on("data", (chunk) => {
                str += chunk;
            });
            response.on("end", () => {
                resolve(str);
            });
        };

        const errorCallback = (err) => {
            console.log("problem with request: " + err);
            reject(err);
        };

        const req = https.request(options, successCallback);
        req.on("error", errorCallback);

        if (payload) {
            req.write(payload);
        }
        req.end();
    });
};

// Helper methods: everything goes through request() in the end
export const options = (hostname, path, port, headers) => request(hostname, path, "OPTIONS", null, port, headers);
export const get = (hostname, path, port, headers) => request(hostname, path, "GET", null, port, headers);
export const head = (hostname, path, port, headers) => request(hostname, path, "HEAD", null, port, headers);
export const post = (hostname, path, payload, port, headers) => request(hostname, path, "POST", payload, port, headers);
export const put = (hostname, path, payload, port, headers) => request(hostname, path, "PUT", payload, port, headers);
export const patch = (hostname, path, payload, port, headers) => request(hostname, path, "PATCH", payload, port, headers);
export const del = (hostname, path, port, headers) => request(hostname, path, "DELETE", null, port, headers);

// curried version: the idea being that one instance corresponds to one host & port which never changes 
export default (hostname, port = DEFAULT_PORT) => ({
    request: (path, method, payload = null, headers) => request(hostname, path, method, payload, port, headers),
    options: (path, headers) => request(hostname, path, "OPTIONS", null, port, headers),
    get: (path, headers) => request(hostname, path, "GET", null, port, headers),
    head: (path, headers) => request(hostname, path, "HEAD", null, port, headers),
    post: (path, payload = null, headers) => request(hostname, path, "POST", payload, port, headers),
    put: (path, payload = null, headers) => request(hostname, path, "PUT", payload, port, headers),
    patch: (path, payload = null, headers) => request(hostname, path, "PATCH", payload, port, headers),
    del: (path, payload = null, headers) => request(hostname, path, "DELETE", payload, port, headers)
});