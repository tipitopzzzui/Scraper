const express = require('express')
let router = express.Router();
const { default: axios } = require("axios")
const https = require("https")
const cheerio = require("cheerio")
const mongoose = require("mongoose")
const itemService = require("../service/itemService")
const res = require('express/lib/response');

let site = "vedant";
let j = 1;
let flag = false;

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})


class vedants {
    static async getStorage() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/storage?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "storage");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }

    static async getProcessor() {
        console.log('----------PROCESSOR----------')
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/processor?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "processor");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }

    static async getGraphics() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/graphics-card?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "graphics");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }

    static async getMemory() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/memory?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "memory");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }
    static async getCabinet() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/cabinet?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "cabinet");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }

    static async getHeadset() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/peripherals/headset?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "headset");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }

    static async getKeyboard() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/peripherals/keyboard?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "keyboard");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }

    static async getMonitor() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/monitor?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "monitor");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }
    static async getMotherboard() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/motherboard?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "motherboard");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }

    static async getMouse() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/peripherals/mouse?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "mouse");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }

    static async getPower() {
        while (flag == false) {
            await axios.get(`https://www.vedantcomputers.com/pc-components/power-supply?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapevedants($, "power");
                    j = j + 1;
                }).catch((err) => {
                    flag = true;
                })
        }
    }
}

async function scrapevedants($, type) {
    const element = $('div.product-thumb');
    if (element.length == 0) { flag = true; }
    for (let i = 0; i < element.length; i++) {
        const item = $(element[i]).find('div.name').find('a');
        const url = $(item).attr('href');
        const title = $(item).text().trim();
        const sku = `${title}${site}`;
        const stock = "In Stock";
        let price = $(element[i]).find('span.price-new').text().trim()
        if (price == "") {
            price = $(element[i]).find('span.price-normal').text().trim()
        }
        if (price == '')
        {
            price = '0'
        }
        if (title == '')
        {
            title = 'N/A'
        }
        const details = {
            sku: sku,
            title: title,
            url: url,
            price: price,
            site: site,
            stock: stock
        };
        await itemService.getOne(sku, type).then((response) => {
            if (response) {
                try {
                    itemService.update(sku, details, type);
                    console.log("Found :)");
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Not found!");
                itemService.create(details, type);
            }
        });
    }
}


module.exports = vedants;
