const puppeteer = require("puppeteer");

async function main() {
    let urlsPerfis;
    const quantidadePaginasPesquisar=1
    const filtroPesquisa = {
        "empresa": "Adapcon",
        "cargo": "Financeiro"
    }

    urlsPerfis = await obterPerfisLinkedin(quantidadePaginasPesquisar, filtroPesquisa);
    urlsPerfis = await filtrarCargoPerfis(urlsPerfis, filtroPesquisa);
    console.log(urlsPerfis)
};

async function obterPerfisLinkedin(quantidadePaginasPesquisar, filtroPesquisa) {
    const urlPesquisa = `https://www.google.com/search?q=${filtroPesquisa.empresa}+${filtroPesquisa.cargo}+linkedin`;
    let urls = new Array();
    let numeroPagina = 1;

    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();

    await pagina.goto(urlPesquisa)

    do {
        let urlsPagina = await obterUrlsPagina(pagina);
        
        urls.push(...urlsPagina);

        await pagina.click('#pnnext');
        await pagina.waitForSelector('#pnnext');

        numeroPagina += 1;
    } while (numeroPagina <= quantidadePaginasPesquisar)

    await pagina.close();
    await navegador.close();

    return urls
}

async function obterUrlsPagina(pagina) {
    let urls, tags, tagsArray;
        
    urls = await pagina.evaluate(() => {
        tags = document.querySelectorAll('.yuRUbf a');
        tagsArray = Array.from(tags);

        return tagsArray.map(tag => tag.href)
    });

    return urls.filter(url => url.substr(0,27) == "https://br.linkedin.com/in/")
}

async function filtrarCargoPerfis(urlsPerfis, filtroPesquisa) {
    let urlsFiltradas = new Array();

    for await (url of urlsPerfis) {
        let cargo = (await obterCargoAtualPerfil(url)).toLowerCase();

        if (cargo.includes(filtroPesquisa.cargo.toLowerCase())) {
            urlsFiltradas.push(url)
        }
    }
    return urlsFiltradas;
}

async function obterCargoAtualPerfil(url) {
    const navegador = await puppeteer.launch({ headless: false });
    const pagina = await navegador.newPage();
     
    await pagina.goto(url);
    await pagina.waitForSelector('.experience-item');

    let cargo = await pagina.$eval('.experience [data-section="currentPositionsDetails"] h3', tag => tag.innerText);
    
    await pagina.close();
    await navegador.close();

    return cargo;
}

main();