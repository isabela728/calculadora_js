let display = document.getElementById('display');
let dadoAtual = '';

function adicionarNumero(numero) {
    if (numero === '.') {

        let partes = dadoAtual.split(/[\+\-\*\/\%]/);  //Separa a expressão em partes usando os operadores como separadores
        let ultimoNumero = partes[partes.length - 1]; // Ele pega o tamanho do array partes e subtrai 1 para obter a posição do último elemento, que é o número atual que está sendo digitado.

        if (ultimoNumero.includes('.')) { // Verifica se o número atual já contém um ponto decimal, e se sim, ele não permite adicionar outro ponto.
            return;
        }
    }
    
    dadoAtual += numero;
    display.textContent = dadoAtual;
}

function adicionarOperador(operador) {
    if (dadoAtual === '') {
        return;
    }

    let ultimoCaracter = dadoAtual.slice(-1); // Ele usa o slice para obter o último caractere da string dadoAtual. O -1 indica que ele deve começar a partir do final da string e pegar apenas um caractere, ou seja, o último.

    if (['+', '-', '*', '/', '%'].includes(ultimoCaracter)) { // Verifica se o último caractere é um operador.
        dadoAtual = dadoAtual.slice(0, -1); // Remove o último operador, de modo que o não se repita, e o novo operador seja adicionado no lugar do antigo.
    }
    
    dadoAtual += operador;
    display.textContent = dadoAtual;
}

function calcular() {
    try {  
        let expressao = dadoAtual.replace(/%/g, '/100*'); // Substitui a % pelo valor decimal para calcular a porcentagem corretamente.
        
        if (['/','*','+','-','%'].some(char => expressao.endsWith(char))) { // Verifica se a expressão termina com um operador, e se sim, ele remove o operador para evitar erros de sintaxe ao avaliar a expressão. Referência - https://stackoverflow.com/a/63881247

            expressao = expressao.slice(0, -1);
        }

        let resultado = eval(expressao); // A função eval() é usada para avaliar a expressão matemática contida na string expressao. Ela interpreta a string como código JavaScript e executa a operação matemática correspondente, retornando o resultado.
        
        if (!Number.isInteger(resultado)) {
            resultado = parseFloat(resultado.toFixed(10));
        }
        dadoAtual = String(resultado);
        display.textContent = dadoAtual;
    } catch {
        display.textContent = 'Erro';
        dadoAtual = '';
    }
}

function limparDisplay() {
    dadoAtual = '';
    display.textContent = dadoAtual;
}

function removerNumero() {
    dadoAtual = dadoAtual.slice(0, -1);
    display.textContent = dadoAtual; // Reescreve tudo, menos o ultimo caractere, que é o que será removido.
}