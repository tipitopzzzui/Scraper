const express = require('express')
let router = express.Router();
const { default: axios } = require("axios")
const https = require("https")
const cheerio = require("cheerio")
const mongoose = require("mongoose")
const itemService = require("../service/itemService")
const res = require('express/lib/response');

let site = "theitdepot";
let flag = false;
axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})
const puppeteer = require('puppeteer');
class theitdepot {
    static async getStorage() {
        const { page, browser } = await openbrowser();
        let j = 1;
        flag = false;
        while (flag == false) {
            try {
                console.log(`j => ${j}`)
    
                await page.goto(`https://www.theitdepot.com/products-Solid+State+Drive+(SSD)_C93.html?page=${j}`);
                const content = await page.content();
                const $ = cheerio.load(content)
                await scrapetheitdepots($, "storage");
                j = j + 1;
            } catch (error) {
                flag = true;
                console.log(error)   
            }

        }
        browser.close();
    }

    static async getProcessor() {
        const { page, browser } = await openbrowser();
        console.log('----------PROCESSOR----------')
        let j = 1;
        flag = false;
        while (flag == false) {
            try {
    
                await page.goto(`https://www.theitdepot.com/products-Processors_C30.html?page=${j}`);
                const content = await page.content();
                const $ = cheerio.load(content)
                await scrapetheitdepots($, "processor");
                j = j + 1;
            } catch (error) {
                flag = true;
                console.log(error)   
            }

        }
        browser.close();
    }

    static async getGraphics() {
        const { page, browser } = await openbrowser();
        let j = 1;
        flag = false;
        while (flag == false) {
            try {
    
                await page.goto(`https://www.theitdepot.com/products-Graphic+Cards_C45.html?page=${j}`);
                const content = await page.content();
                const $ = cheerio.load(content)
                await scrapetheitdepots($, "graphics");
                j = j + 1;
            } catch (error) {
                flag = true;
                console.log(error)   
            }

        }
        browser.close();
    }

    static async getMemory() {
        const { page, browser } = await openbrowser();
        let j = 1;
        flag = false;
        while (flag == false) {
            try {
    
                await page.goto(`https://www.theitdepot.com/products-RAM+(Memory)_C6.html?page=${j}`);
                const content = await page.content();
                const $ = cheerio.load(content)
                await scrapetheitdepots($, "memory");
                j = j + 1;
            } catch (error) {
                flag = true;
                console.log(error)   
            }

        }
        browser.close();
    }
}


async function openbrowser() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });
    console.log("Browser opened")
    const page = await browser.newPage();
    return { page, browser };
}

async function scrapetheitdepots($, type) {
    const element = $('div.product.d-flex.flex-column');
    if (element.length == 0) { flag = true; return;}
    // console.log(element)
    for (let i = 0; i < element.length; i++) {
        let stock = $(element[i]).find('span.textcentered.badge.badge-white.bg-white.shadow.text-danger.text-uppercase.px-4.py-2').text().trim();
        let item = $(element[i]).find('div.card-text.px-2.py-1.font-size85.product_title').find('a');
        let title = $(item).attr("title");
        let price = "₹" + $(element[i]).find('div.card-text.px-2.py-1.product_title').find('strong').text().trim();
        let url = `https://www.theitdepot.com/${(item).attr("href")}`;
        // const stock = $(element[i]).find("span.textcentered.badge.badge-white.bg-white.shadow.text-danger.text-uppercase.px-4.py-2").text().trim()
        if(stock == '')
        {
            stock = "In stock";
        }
        const sku = `${title}${site}`;
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
                    console.log("Found :0");
                    itemService.update(sku, details, type);
                } catch (error) {
                    console.log(error);
                }
            } else {
                itemService.create(details, type);
                console.log(`${sku} Not found!`);
            }
        });
    }
}


module.exports = theitdepot;
