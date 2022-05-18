const csvUtils = require('./csvUtils');
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

let ktFilePath = "KT 文档 - Sheet1.csv";
var ktFile = csvUtils.readCsvFileToMemory(ktFilePath);

function fetchResonse(url) {
    if (url.indexOf("https") < 0) {
        return Promise.resolve();
    }
    return fetch(url, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "zzzz"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });
}

async function getEpicDescription(url) {
    let response = await fetchResonse(url);

    try {
        var body = await response.text();
        const dom = new JSDOM(body);
        return dom.window.document.querySelector("title").textContent;
    } catch (e) {
        return url;
    }
}


let promises = ktFile.map(async data => {
    const title = await getEpicDescription(data["epic 地址"]);
    data["epic名称"] = title;
    return data;
});


Promise.all(promises).then(data => {
    csvUtils.writeFileToCsv(data);
})
