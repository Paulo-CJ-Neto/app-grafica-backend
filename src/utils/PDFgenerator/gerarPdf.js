const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(data) {
  try {
    const browser = await puppeteer.launch({
      headless: 'new'
    });

    const page = await browser.newPage();

    // Lê o template HTML
    let htmlHeader = fs.readFileSync('./header.html', 'utf-8');
    let htmlFooter = fs.readFileSync('./footer.html', 'utf-8');
    let htmlDinamic = generateProductBlock(data)
    let htmlTemplate = htmlHeader + htmlDinamic + htmlFooter

    // Substitui os valores dinâmicos no template
    await page.setContent(htmlTemplate);
    await page.addStyleTag({ path: 'style.css' })


    const pdf = await page.pdf({
      margin: {
        top: '10mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      // footerTemplate: `
      //   <div style="font-size: 10px; text-align: center; width: 100%;">
      //     <span class="pageNumber"></span> de <span class="totalPages"></span>
      //   </div>
      // `
    });

    await browser.close();
    return pdf;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}

function generateProductBlock(products) {
  return products.map(item => `
      <section class="halfPageInpiration">

        <div class="top">
          <div class="topContainer fotoContainer">
            <img id="photo" src="${item.imagem || 'https://salonlfc.com/image-not-found/'}" />
          </div>
          <div class="topContainer bg-gray">
            <h2>Produto: ${item.titulo}</h2>
            <p>Descrição: ${item.descricao || 'não se aplica'}</p>
          </div>
        </div>

        <div class="down">
          <div class="downContainer bg-gray">
            <h2>Quantidade: </h2>
            <p>${item.quantidade}</p>
          </div>
          <div class="downContainer bg-gray">
            <h2>Largura: </h2>
            <p>${item.largura || 'não se aplica'}</p>
            <h2>Comprimento: </h2>
            <p>${item.comprimento || 'não se aplica'}</p>
          </div>
          <div class="downContainer bg-gray">
            <h2>Tipo: </h2>
            <p>${item.tipo || 'não se aplica'}</p>
          </div>
        </div>

      </section>
  `).join('');
}

// // Dados de exemplo
// const data = [
//   {
//     "id": 32,
//     "titulo": "eco copo 1",
//     "imagem": "https://i.imgur.com/BiKsPq6.jpeg",
//     "quantidade": 80,
//     "descricao": "musstmgs\nhsmd",
//     "clienteId": 1,
//     "produtoId": 14
//   },
//   {
//     "id": 34,
//     "titulo": "eco copo 2",
//     "imagem": null,
//     "quantidade": 2000,
//     "descricao": "descricao\ndo\nproduto\nprofessores",
//     "clienteId": 1,
//     "produtoId": 15
//   },
//   {
//     "id": 35,
//     "titulo": "eco copo 3",
//     "imagem": null,
//     "quantidade": 666,
//     "descricao": "ovinho de cordorna",
//     "clienteId": 1,
//     "produtoId": 14
//   }
// ];

async function gerarPDF(data) {
  generatePDF(data).then(pdf => {
    fs.writeFileSync('relatorio.pdf', pdf);
    console.log('PDF gerado com sucesso!');
  }).catch(error => {
    console.error('Erro:', error);
  });
}

export default gerarPDF