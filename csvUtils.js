const fs = require('fs');
const stringify = require('csv-stringify');
const parse = require("csv-parse/lib/sync");

function readCsvFileToMemory(path) {
    const data = fs.readFileSync(path);
    return parse(data, {
        columns: true,
    });
}

function writeFileToCsv(data) {
    stringify(data, { header: true }, function (error, output) {
        if (error) console.log("error", error);
        else {
            fs.appendFileSync("KT.csv", output);
        }
    });
}

module.exports = { readCsvFileToMemory, writeFileToCsv }
