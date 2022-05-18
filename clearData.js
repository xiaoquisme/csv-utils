const cscUtils = require('./csvUtils');
const path = 'source-result.csv';
const data = cscUtils.readCsvFileToMemory(path);

function buildKey(record) {
    return `${ record.dealer_id }_${ record["Contract-Customer Mobile Number"] }_record["Contract-Customer ID"]`;
}

const resultMap = data.reduce((map, value) => {
    map[buildKey(value)] = value;
    return map;
}, {})


cscUtils.writeFileToCsv(Object.values(resultMap));
