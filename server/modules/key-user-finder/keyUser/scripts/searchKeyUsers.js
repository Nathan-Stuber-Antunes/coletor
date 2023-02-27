const puppeteer = require("puppeteer");

async function searchKeyUsers(userSearchData) {

    let profileUrls = await getLinkedinProfileUrls(userSearchData);
    let userData = await getProfileDataBySector(profileUrls, userSearchData);
    console.log(`\n Resultado Final: ${JSON.stringify(userData)}`)
    
    return userData
};

async function getLinkedinProfileUrls(userSearchData) {
    const searchUrl = `https://www.google.com/search?q=${userSearchData.company}+${userSearchData.sector}+linkedin`;
    // Financeiro na Adapcon Linkedin
    // Setores: Financeiro, Comercial, TI, Marketing (padrão)
    console.log(`Pesquisa inicial: ${searchUrl}`)

    let urls = new Array();
    let currentPage = 1;
    const pageQuantitiesSearch=1

    const browser = await puppeteer.launch({
        headless: true, args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    await page.goto(searchUrl)

    do {
        console.log(`Lendo Página: ${currentPage}...\n`)
        let pageUrls = await getPageUrls(page);

        urls.push(...pageUrls);

        await page.click('#pnnext');
        await page.waitForSelector('#pnnext');

        currentPage += 1;
    } while (currentPage <= pageQuantitiesSearch)

    await page.close();
    await browser.close();

    return urls
}

async function getPageUrls(page) {
    let urls = await page.evaluate(() => {
        let tags = document.querySelectorAll('.yuRUbf a');
        let tagsArray = Array.from(tags);

        return tagsArray.map(tag => tag.href)
    });

    return urls.filter(url => url.substr(0,27) == "https://br.linkedin.com/in/")
}

async function getProfileDataBySector(profileUrls, userSearchData) {
    let usersData = new Array();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.reload({waitUntil: 'networkidle2'});

    for await (url of profileUrls) {

        await page.goto(url);
        await page.reload({waitUntil: 'networkidle2'});
        await page.waitForSelector('.experience-item');
        console.log(`Acessando página: ${url}`)

        let position = await page.$eval('.experience [data-section="currentPositionsDetails"] h3', tag => tag.innerText);
        position = position.toLowerCase();
    
        if (position.includes(userSearchData.sector.toLowerCase())) {
            let userName = await page.$eval('.top-card-layout__title', tag => tag.innerText);
            let companyName = await page.$eval('.top-card-link__description', tag => tag.innerText);
            let linkedinUrlCompany = await page.$eval('.top-card-link', tag => tag.href);
            
            await page.goto(linkedinUrlCompany);
            await page.reload({waitUntil: 'networkidle2'});
            await page.waitForSelector('dd');
            let companyUrl = await page.$eval('dd', tag => tag.textContent.trim());

            let userData = {
                "nomePerfil": userName,
                "position": position,
                "urlPerfil": url,
                "nomeEmpresa": companyName,
                "urlEmpresa": companyUrl
            }
            
            usersData.push(userData)
        }
        
    }

    await page.close();
    await browser.close();

    return usersData;
}

module.exports.searchKeyUsers = searchKeyUsers;
// searchKeyUsers({"company":"Adapcon","sector":"Financeiro"});