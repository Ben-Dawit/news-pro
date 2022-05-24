const config = require('api/config.js');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const puppeteer = require ('puppeteer');
const fs = require('fs');

module.exports = {
    scrapeNews
};

async function scrapeNews(){
    
    let today = new Date().toISOString().slice(0, 10)
    console.log(today);

    //name of cnn and fox files
    var cnnPath = `cnn${today}.png`;
    var foxPath = `fox${today}.png`;
    const foxPopUp = "#eb627c06237410f1288451ba37fc71e9 > div > div > div > button";


    //launching browser
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    
    //scraping cnn
    await page.goto('https://www.cnn.com/');
    page.setViewport({width: 351, height: 518})
    await page.screenshot({ path: cnnPath})

    //deletes cnn file (optional, used for development)
    // await fs.unlink(cnnPath);

    //scraping fox and bypassing popup
    await page.goto('https://www.foxnews.com/');
    page.setViewport({width: 351, height: 518})
    
    //fox sometimes has a popup you need to close by clicking the x button, this does that.
    await page.click(foxPopUp);
    await page.screenshot({ path: foxPath })

    await browser.close();

    return 
}
