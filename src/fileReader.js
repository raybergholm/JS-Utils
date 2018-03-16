export const ReadModes = {
    ArrayBuffer: "A",
    Binary: "B",
    DataURL: "D",
    Text: "T"
};

export const readFile = (file, inputReadMode = ReadModes.Text) => new Promise(
    (resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.addEventListener("load", event => resolve({
            file: file,
            content: event.target.result
        }));

        fileReader.addEventListener("error", () => reject({
            file: file,
            error: fileReader.error
        }));

        switch (inputReadMode) {
            case ReadModes.ArrayBuffer:
                fileReader.readAsArrayBuffer(file);
                break;
            case ReadModes.Binary:
                fileReader.readAsBinaryString(file);
                break;
            case ReadModes.DataURL:
                fileReader.readAsDataURL(file);
                break;
            case ReadModes.Text:
                fileReader.readAsText(file);
                break;
            default:
                throw new Error("Invalid read mode");
        }
    }
);

export const readFiles = (files, inputReadMode) => Promise.all(Array.from(files).map(file => readFile(file, inputReadMode)));

export default {
    readFile,
    readFiles
};