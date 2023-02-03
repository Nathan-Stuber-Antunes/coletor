const puppeteer = require("puppeteer");

/**
 * Informações do CSV
 * 
 * - Url do Perfil
 * - Nome completo
 * - Cargo
 * - Url da Empresa
 * - Nome da Empresa
 * 
 * Elemento HTML para Obter o link da Adapcon no Linkedin: document.querySelector('.top-card-link').href
 * Elemento HTML para Obter o link do site da Adapcon: document.querySelector('dd').textContent.trim()
 * 
 *  [{"nomePerfil":"Francisleine Rosa Alves","cargo":"analista financeiro","urlPerfil":"https://br.linkedin.com/in/francisleine-rosa-alves-83310252","nomeEmpresa":"Adapcon","urlEmpresa":"http://www.adapcon.com.br"}]
 */

async function main() {
    let urlsPerfis;
    const quantidadePaginasPesquisar=1
    const filtroPesquisa = {
        "empresa": "Adapcon",
        "cargo": "Financeiro"
    }

    urlsPerfis = await obterPerfisLinkedin(quantidadePaginasPesquisar, filtroPesquisa);
    urlsPerfis = await filtrarCargoPerfis(urlsPerfis, filtroPesquisa);
    console.log(`\n Resultado Final: ${JSON.stringify(urlsPerfis)}`)
};

async function obterPerfisLinkedin(quantidadePaginasPesquisar, filtroPesquisa) {
    const urlPesquisa = `https://www.google.com/search?q=${filtroPesquisa.empresa}+${filtroPesquisa.cargo}+linkedin`;
    console.log(`Pesquisa inicial: ${urlPesquisa}`)
    let urls = new Array();
    let numeroPagina = 1;

    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();

    await pagina.goto(urlPesquisa)

    do {
        console.log(`Lendo Página: ${numeroPagina}...\n`)
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
        const navegador = await puppeteer.launch({headless: false});
        const pagina = await navegador.newPage();

        await pagina.goto(url);
        await pagina.reload({waitUntil: 'networkidle2'});
        await pagina.waitForSelector('.experience-item');
        console.log(`Acessando página: ${url}`)

        let cargo = await pagina.$eval('.experience [data-section="currentPositionsDetails"] h3', tag => tag.innerText);
        cargo = cargo.toLowerCase();
    
        if (cargo.includes(filtroPesquisa.cargo.toLowerCase())) {
            let nomePerfil = await pagina.$eval('.top-card-layout__title', tag => tag.innerText);
            let nomeEmpresa = await pagina.$eval('.top-card-link__description', tag => tag.innerText);
            let urlLinkedinEmpresa = await pagina.$eval('.top-card-link', tag => tag.href);
            
            await pagina.goto(urlLinkedinEmpresa);
            await pagina.reload({waitUntil: 'networkidle2'});
            await pagina.waitForSelector('dd');
            let urlEmpresa = await pagina.$eval('dd', tag => tag.textContent.trim());

            let objPerfil = {
                "nomePerfil": nomePerfil,
                "cargo": cargo,
                "urlPerfil": url,
                "nomeEmpresa": nomeEmpresa,
                "urlEmpresa": urlEmpresa
            }
            
            urlsFiltradas.push(objPerfil)
        }
        
        await pagina.close();
        await navegador.close();
    }
    return urlsFiltradas;
}

main();