const express = require('express')
let router = express.Router();
const { default: axios } = require("axios")
const cheerio = require("cheerio")
const https = require("https")
const mongoose = require("mongoose")
const Storage = require("../models/storage");
const itemService = require('../service/itemService');


let site = "primegb";
let resp = 1;
let flag = false;

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

class primeabgb {
    static async getStorage() {
        let j = 1;
        flag = false;
        while (flag == false) {
            await axios.get(`https://www.primeabgb.com/buy-online-price-india/internal-hard-drive/page/${j}/`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapeprimegb($, "storage");
                    j = j + 1;
                })
                .catch((err) => {
                    flag = true;
                    resp = 0;
                })
        }
    }
    static async getProcessor() {
        let j = 1;
        flag = false;
        while (flag == false) {
            await axios.get(`https://www.primeabgb.com/buy-online-price-india/cpu-processor/page/${j}/`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapeprimegb($, "processor");
                    j = j + 1;
                })
                .catch((err) => {
                    flag = true;
                    console.log(err)
                })
        }
    }
    static async getGraphics() {
        let j = 1;
        flag = false;
        while (flag == false) {
            await axios.get(`https://www.primeabgb.com/buy-online-price-india/graphic-cards-gpu/page/${j}/`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapeprimegb($, "graphics");
                    j = j + 1;
                })
                .catch((err) => {
                    flag = true;
                    resp = 0;
                })
        }
    }
    static async getMemory() {
        let j = 1;
        flag = false;
        while (flag == false) {
            await axios.get(`https://www.primeabgb.com/buy-online-price-india/ram-memory/page/${j}/`)
                .then(async (response) => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    await scrapeprimegb($, "memory");
                    j = j + 1;
                })
                .catch((err) => {
                    flag = true;
                    resp = 0;
                })
        }
    }
}





async function scrapeprimegb($, type) {
    const element = $('div.product-wrapper');
    if (element.length == 0) { flag = true; }
    for (let i = 0; i < element.length; i++) {
        const item = $(element[i]).find("div.product-info").find("a");
        const title = $(item).text().trim();
        const url = $(item).attr("href");
        const pricelist = $(element[i]).find("span.woocommerce-Price-amount.amount")
        let price = $(pricelist[1]).text()
        if (price == '') {
            price = $(pricelist).text()
        }
        const sku = `${title}${site}`;
        const details = {
            sku: sku,
            title: title,
            price: price,
            url: url,
            site: site,
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

module.exports = primeabgb;