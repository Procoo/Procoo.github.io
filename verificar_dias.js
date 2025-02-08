const fs = require('fs');
const path = require('path');

// Caminho para o arquivo HTML
const htmlFilePath = path.join(__dirname, 'index.html');

// Função para calcular a diferença de dias
function calcularDiferenca(dataInicial) {
    const agora = new Date();
    const diferenca = agora - dataInicial; // Diferença em milissegundos

    // Convertendo a diferença para dias
    const diasTotais = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    // Calculando anos, meses e dias restantes
    const anos = Math.floor(diasTotais / 365);
    const meses = Math.floor((diasTotais % 365) / 30);
    const dias = (diasTotais % 365) % 30;

    return { anos, meses, dias, diasTotais };
}

// Função para extrair a data inicial do arquivo HTML
function extrairDataInicial() {
    const data = fs.readFileSync(htmlFilePath, 'utf8');
    const regex = /const inicioNamoro = new Date\((\d{4}), (\d{1,2}), (\d{1,2})\);/;
    const match = data.match(regex);

    if (!match) {
        throw new Error('Data inicial não encontrada no arquivo HTML.');
    }

    const ano = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const dia = parseInt(match[3], 10);
    return new Date(ano, mes, dia);
}

// Verifica e exibe os dias
try {
    const dataInicial = extrairDataInicial();
    const { anos, meses, dias, diasTotais } = calcularDiferenca(dataInicial);

    console.log(`Anos, Meses e Dias: ${anos} anos, ${meses} meses e ${dias} dias`);
    console.log(`Total em Dias: ${diasTotais} dias`);
} catch (err) {
    console.error('Erro ao verificar os dias:', err.message);
}