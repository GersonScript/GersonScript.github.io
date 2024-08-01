let isRolling = false;
let marcarPosicao = 0;
let valorVoltarCasa = null;
let intervaloCronometro = null;
let contagemRegressiva = 25000;
let novoNumero = 0;
let sorteioRealizado = false;
let sorteioEmAndamento = false; // Definindo a variável que estava faltando

function definirVariaveisGlobais(resultado, voltarCasa, numeroGerado) {
    marcarPosicao = resultado;
    valorVoltarCasa = voltarCasa;
    novoNumero = numeroGerado;
}

function jogarDado() {
    if (isRolling) return;
    isRolling = true;
    const numeroGerado = Math.floor(Math.random() * 6) + 1;
    const randomX = Math.floor(Math.random() * 4) * 360;
    const randomY = Math.floor(Math.random() * 4) * 360;
    const cubo = document.getElementById('cubo');
    cubo.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

    setTimeout(() => {
        let finalX = randomX;
        let finalY = randomY;

        switch (numeroGerado) {
            case 1:
                break;
            case 2:
                finalY -= 90;
                break;
            case 3:
                finalY -= 180;
                break;
            case 4:
                finalY += 90;
                break;
            case 5:
                finalX -= 90;
                break;
            case 6:
                finalX += 90;
                break;
        }
        cubo.style.transition = 'transform 2s ease-in-out';
        cubo.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;

        setTimeout(() => {
            let resultado = marcarPosicao + numeroGerado;
            const voltarCasa = marcarPosicao;

            if (resultado >= 21) {
                resultado = 21;
                mostrarTelaSucesso();
            } else {
                exibirPergunta(resultado);
            }

            definirVariaveisGlobais(resultado, voltarCasa, numeroGerado);
            configurarEstilosMarcador(resultado);

            isRolling = false;
        }, 2000);
    }, 1000);
}

function exibirPergunta(numeroCasa) {
    const perguntaDiv = document.getElementById("pergunta");
    const telaCheia = document.getElementById("tela-cheia");
    const sortear = document.getElementById('sortear');

    if (numeroCasa === 6 || numeroCasa === 10 || numeroCasa === 14) {
        sortear.style.display = "flex";
        sortear.innerHTML = "Clique aqui";
        telaCheia.style.display = "block";
        perguntaDiv.innerHTML = "";

        sortear.onclick = () => {
            if (sorteioEmAndamento) return;
            sorteioEmAndamento = true;
            sortear.innerHTML = "Sorteando...";
            sortear.style.pointerEvents = 'none';

            setTimeout(() => {
                const messages = [
                    "Avance 3 casas",
                    "Volte 3 casas",
                    "Avance 2 casas",
                    "Volte 2 casas",
                    "Avance 1 casa",
                    "Volte 1 casa"
                ];
                const randomIndex = Math.floor(Math.random() * messages.length);
                const selectedMessage = messages[randomIndex];
                sortear.innerHTML = selectedMessage;

                setTimeout(() => {
                    telaCheia.style.display = "none";
                    sortear.style.display = "none";
                    processarSorteio(selectedMessage);
                }, 2000);

                setTimeout(() => {
                    sorteioEmAndamento = false;
                    sortear.style.pointerEvents = 'auto';
                }, 4000);
            }, 2000);
        };

    } else if (numeroCasa >= 21) {
        mostrarTelaSucesso();
    } else {
        setTimeout(() => {
            telaCheia.style.display = "block";
            perguntaDiv.style.display = "block";
            const pergunta = obterPergunta(numeroCasa);
            if (pergunta) {
                const { pergunta: textoPergunta, opcoes, resposta } = pergunta;

                const perguntaHTML = `
                <h2>${textoPergunta}</h2>
                <form id="formRespostas">
                    ${opcoes.map((opcao, index) => `
                        <input type="radio" id="opcao${index}" name="resposta" value="${opcao}">
                        <label for="opcao${index}">${opcao}</label><br>
                    `).join('')}
                    <br>
                    <button type="button" onclick="verificarResposta('${resposta}')">Enviar</button>
                    <div class="cronometro" id="cronometro">25.00</div>
                </form>
                `;
                perguntaDiv.innerHTML = perguntaHTML;

                iniciarCronometro();
            } else {
                sortear.style.display = "block";
                perguntaDiv.style.display = "none";
            }
        }, 1000);
    }
}

function obterPergunta(numeroCasa) {
    const perguntasCasa = perguntas[numeroCasa];
    const indiceAleatorio = Math.floor(Math.random() * perguntasCasa.length);
    return perguntasCasa[indiceAleatorio];
}

function iniciarCronometro() {
    contagemRegressiva = 25000;
    const elementoCronometro = document.getElementById('cronometro');

    if (intervaloCronometro) clearInterval(intervaloCronometro);

    intervaloCronometro = setInterval(() => {
        contagemRegressiva -= 10;
        const segundos = Math.floor(contagemRegressiva / 1000);
        const milesimos = Math.floor((contagemRegressiva % 1000) / 10);
        const exibirSegundos = segundos < 10 ? '0' + segundos : segundos;
        const exibirMilesimos = milesimos < 10 ? '0' + milesimos : milesimos;
        elementoCronometro.textContent = `${exibirSegundos}.${exibirMilesimos}`;

        if (contagemRegressiva <= 8000) {
            elementoCronometro.style.color = 'red';
        } else if (contagemRegressiva <= 16000) {
            elementoCronometro.style.color = 'yellow';
        } else {
            elementoCronometro.style.color = 'green';
        }

        if (contagemRegressiva <= 0) {
            clearInterval(intervaloCronometro);
            const telaCheia = document.getElementById("tela-cheia");
            document.getElementById('pergunta').style.display = 'none';
            telaCheia.style.display = "none";
            marcarPosicao = valorVoltarCasa;
            configurarEstilosMarcadorVoltarCasa(marcarPosicao);
        }
    }, 10);
}

function verificarResposta(respostaCorreta) {
    const formRespostas = document.getElementById("formRespostas");
    const respostaSelecionada = formRespostas.querySelector('input[name="resposta"]:checked');
    const perguntaDiv = document.getElementById("pergunta");
    const telaCheia = document.getElementById("tela-cheia");

    if (!respostaSelecionada) {
        alert("Selecione uma resposta antes de enviar.");
        return;
    }
    if (respostaSelecionada.value === respostaCorreta) {
        alert("Resposta correta!");
        telaCheia.style.display = "none";
        perguntaDiv.style.display = "none";
    } else {
        alert("Resposta incorreta.");
        marcarPosicao = valorVoltarCasa;
        telaCheia.style.display = "none";
        perguntaDiv.style.display = "none";
        configurarEstilosMarcadorVoltarCasa(marcarPosicao);
    }
}

function processarSorteio(selectedMessage) {
    if (selectedMessage === "Avance 3 casas") {
        marcarPosicao += 3;
        configurarEstilosMarcador(marcarPosicao);
        exibirPergunta(marcarPosicao);
    } else if (selectedMessage === "Volte 3 casas") {
        marcarPosicao -= 3;
        if (marcarPosicao < 0) {
            marcarPosicao = 3;
        }
        configurarEstilosMarcadorVoltarCasa(marcarPosicao);
    } else if (selectedMessage === "Avance 2 casas") {
        marcarPosicao += 2;
        configurarEstilosMarcador(marcarPosicao);
        exibirPergunta(marcarPosicao);
    } else if (selectedMessage === "Volte 2 casas") {
        marcarPosicao -= 2;
        if (marcarPosicao < 0) {
            marcarPosicao = 2;
        }
        configurarEstilosMarcadorVoltarCasa(marcarPosicao);
    } else if (selectedMessage === "Avance 1 casa") {
        marcarPosicao += 1;
        configurarEstilosMarcador(marcarPosicao);
        exibirPergunta(marcarPosicao);
    } else if (selectedMessage === "Volte 1 casa") {
        marcarPosicao -= 1;
        if (marcarPosicao < 0) {
            marcarPosicao = 0;
        }
        configurarEstilosMarcadorVoltarCasa(marcarPosicao);
    }
}

function configurarEstilosMarcador(posicao) {
    // Adicione a lógica para atualizar os estilos do marcador com base na nova posição
}

function configurarEstilosMarcadorVoltarCasa(posicao) {
    // Adicione a lógica para atualizar os estilos do marcador com base na posição de volta
}

function mostrarTelaSucesso() {
    // Adicione a lógica para mostrar a tela de sucesso quando o jogador chega ao final
}
