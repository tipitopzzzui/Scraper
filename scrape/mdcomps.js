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
}
async function scrapemdcomp($, type) {
    const element = $('div.product-item-container');
    if (element.length == 0) {
        flag = true;
        return;
    }
    for (let i = 0; i < element.length; i++) {
        const item = $(element[i]).find('div.right-block.right-b').find('a');
        const title = $(item).text().trim();
        const url = $(item).attr('href');
        const price = $(element[i]).find('span.price-new').text().trim()
        const sku = `${title}${site}`;
        const details = {
            sku: sku,
            title: title,
            url: url,
            price: price,
            site: site,
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


