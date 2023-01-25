const puppeteer = require("puppeteer");

async function main() {
    const quantidadePaginasPesquisar=1
    const filtroPesquisa = {
        "empresa": "Adapcon",
        "cargo": "Desenvolvimento"
    }
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();

    let urlsPerfis = await obterPerfisLinkedin(navegador, quantidadePaginasPesquisar, filtroPesquisa);
    console.log("--------- FILTRADO");
    console.log(urlsPerfis);

    await pagina.close();
    await navegador.close();
};

async function obterPerfisLinkedin(navegador, quantidadePaginasPesquisar, filtroPesquisa) {
    const urlPesquisa = `https://www.google.com/search?q=${filtroPesquisa.empresa}+${filtroPesquisa.cargo}+linkedin`;
    let urls = new Array();
    let numeroPagina = 1;

    const pagina = await navegador.newPage();
    await pagina.goto(urlPesquisa)

    do {
        let urlsPagina = await obterUrlsPagina(pagina, filtroPesquisa);
        
        urls.push(...urlsPagina);

        await pagina.click('#pnnext');
        await pagina.waitForSelector('#pnnext');

        numeroPagina += 1;
    } while (numeroPagina <= quantidadePaginasPesquisar)

    return urls
}

async function obterUrlsPagina(pagina, filtroPesquisa) {
    let scrapUserData, tags, tagsArray;
        
    scrapUserData = await pagina.evaluate(() => {
        tags = document.querySelectorAll('.yuRUbf');
        tagsArray = Array.from(tags);

        return tagsArray.map(tag => {
            return {
                "cargo": tag.getElementsByTagName('h3')[0].textContent.toLowerCase(),
                "url": tag.getElementsByTagName('a')[0].href
            }
        })
    });

    console.log("--------- TUDO");
    console.log(scrapUserData);
    console.log("");
    return scrapUserData.filter(userData => {
        return ( ( userData.url.substr(0,27) == "https://br.linkedin.com/in/" ) && ( userData.cargo.includes(filtroPesquisa.cargo.toLowerCase())) )
    })
}

main();