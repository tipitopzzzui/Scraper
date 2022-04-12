const express = require('express')
let router = express.Router();
const { default: axios } = require("axios")
const cheerio = require("cheerio")
const https = require("https")
const mongoose = require("mongoose")
const Storage = require("../models/storage");
const itemService = require('../service/itemService');


let site = "mdcomp";
let resp = 1;
let flag = false;

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

class mdcomp {
    static async getStorage() {
        flag = false;
        let j = 1
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/storage?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "storage");
                    j = j + 1;
                    console.log(`j => ${j}`)
                })
                .catch((err) => {
                    console.log(err)
                    resp = 0;
                    // console.log(err)
                })
        }
    }
    static async getGraphics() {
        flag = false;
        let j = 1
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/graphics-card?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "graphics");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }
    static async getProcessor() {
        flag = false;
        let j = 1
        console.log('----------PROCESSOR----------')
        while (resp != 0 && flag == false) {
            console.log(`flag => ${flag}`)
            await axios.get(`https://mdcomputers.in/processor?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "processor");
                    j = j + 1;
                    console.log(`j => ${j}`)
                })
                .catch((err) => {
                    resp = 0;
                    console.log(err)
                })
        }
    }
    static async getMemory() {
        let j = 1
        flag = false;
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/memory?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "memory");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }

    static async getMotherboard() {
        let j = 1
        flag = false;
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/motherboards?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "motherboard");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }

    static async getPower() {
        let j = 1
        flag = false;
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/smps?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "power");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }

    static async getMonitor() {
        let j = 1
        flag = false;
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/monitors?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "monitor");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }

    static async getCabinet() {
        let j = 1
        flag = false;
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/cabinet?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "cabinet");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }

    static async getMouse() {
        let j = 1
        flag = false;
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/mouse?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "mouse");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }

    static async getKeyboard() {
        let j = 1
        flag = false;
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/keyboard?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "keyboard");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }

    static async getHeadset() {
        let j = 1
        flag = false;
        while (resp != 0 && flag == false) {
            await axios.get(`https://mdcomputers.in/headsets?page=${j}`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapemdcomp($, "headset");
                    j = j + 1;
                })
                .catch((err) => {
                    resp = 0;
                    // console.log(err)
                })
        }
    }
}
async function scrapemdcomp($, type) {
    const element = $('div.product-item-container');
    if (element.length == 0) {
        flag = true;
        return;
    }
    for (let i = 0; i < element.length; i++) {
        let item = $(element[i]).find('div.right-block.right-b').find('a');
        let title = $(item).text().trim();
        let url = $(item).attr('href');
        url = `${url}?tracking=bu8gCQsOURomCJCAApLWF4Wq7QfzCwYnTNb3GvixW3NNaEtlLQdH5mQm4pgkJOkA`;
        let price = $(element[i]).find('span.price-new').text().trim()
        const sku = `${title}${site}`;
        if (price == '')
        {
            price = '0'
        }
        if (title == '')
        {
            title = 'N/A'
        }
        const stock = "In stock";
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
                    console.log("Found :0")
                    itemService.update(sku, details, type);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Not Found!")
                itemService.create(details, type);
            }
        });
    }
}

module.exports = mdcomp;


