const fs = require('fs');
const path = require('path');

// Caminho para o arquivo HTML
const htmlFilePath = path.join(__dirname, 'index.html');

// Função para atualizar a data inicial no arquivo HTML
function atualizarDataInicial(dias) {
    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo HTML:', err);
            return;
        }

        // Encontra a linha com a data inicial
        const regex = /const inicioNamoro = new Date\((\d{4}), (\d{1,2}), (\d{1,2})\);/;
        const match = data.match(regex);

        if (!match) {
            console.error('Data inicial não encontrada no arquivo HTML.');
            return;
        }

        // Calcula a nova data
        const ano = parseInt(match[1], 10);
        const mes = parseInt(match[2], 10);
        const dia = parseInt(match[3], 10);
        const novaData = new Date(ano, mes, dia + dias);

        // Atualiza a data no arquivo HTML
        const novaDataStr = `const inicioNamoro = new Date(${novaData.getFullYear()}, ${novaData.getMonth()}, ${novaData.getDate()});`;
        const novoConteudo = data.replace(regex, novaDataStr);

        fs.writeFile(htmlFilePath, novoConteudo, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao salvar o arquivo HTML:', err);
                return;
            }
            console.log(`Data inicial atualizada para: ${novaData.toLocaleDateString()}`);
        });
    });
}

// Uso: node manutencao_dias.js <dias>
const dias = parseInt(process.argv[2], 10);
if (isNaN(dias)) {
    console.error('Por favor, forneça um número válido de dias.');
    process.exit(1);
}

atualizarDataInicial(dias);