const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'insira o login aqui')
    await page.type('input[name="password"]', 'insita a senha aqui');
    await page.click('button[type="submit"]')

    await page.waitForNavigation()
    await page.goto('https://www.instagram.com')
    await page.waitForTimeout(3000)

    let loginButton = await page.$x('//button[contains(text(), "Agora não")]')

    if( loginButton.length > 0){
        await loginButton[0].click()
    }

    await page.waitForTimeout(3000)

    await page.goto('https://www.instagram.com/explore/tags/fiqueemcasa/')

    const imgList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('article img')

        const imgArray = [...nodeList]

        const imgList = imgArray.map(({src}) =>({
            src
        }))

        return imgList
    })

    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err =>{
        if(err) throw new Error('something went wrong')

        console.log('well done!')
    } )




//   await browser.close();
})();