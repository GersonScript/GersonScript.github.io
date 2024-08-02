let alertaExibida = false;

document.getElementById("fundo").style.display = "none";

function abrirAgenda() {
    window.open('https://portal.stf.jus.br/hotsites/agenda-2030/', '_blank');
}

function abrirRegras() {
    window.location.href = './regras.html';
}

function comecarJogo() {
    const fundo = document.getElementById("fundo");
    fundo.style.display = "flex"; // Mostra o fundo de configurações
}
//Mostra alerta
function mostrarAlerta() {
    document.getElementById('fundoAlerta').style.display = 'flex';
}

function fecharAlerta() {
    document.getElementById('fundoAlerta').style.display = 'none';
    alertaExibida = true;
}

function login() {
    window.location.href = './registro.html';
}

function iniciarJogo(tipo) {
    const form = document.getElementById('form-jogo');
    form.innerHTML = ''; // Limpa o formulário
    form.style.display = 'block';

    if (tipo === 'amigo') {
        form.innerHTML += '<label>Quantos amigos (1-4):</label><input type="number" min="1" max="4" id="numAmigos" />';
        form.innerHTML += '<div id="idsAmigos"></div>';
        document.getElementById('numAmigos').addEventListener('input', function () {
            const num = parseInt(this.value) || 0;
            let idsAmigosDiv = document.getElementById('idsAmigos');
            idsAmigosDiv.innerHTML = '';
            for (let i = 1; i <= num; i++) {
                idsAmigosDiv.innerHTML += `<br><label>ID do Amigo ${i}:</label><input type="number" maxlength="10" required /><br>`;
            }
        });
    } else if (tipo === 'robo') {
        form.innerHTML += '<label>Quantos robôs (1-4):</label><input type="number" min="1" max="4" id="numRobos" />';
        form.innerHTML += '<label>Nível de dificuldade:</label><select><option value="fácil">Fácil</option><option value="médio">Médio</option><option value="difícil">Difícil</option></select>';
    } else if (tipo === 'solo') {
        form.innerHTML = '<p>Iniciando jogo solo...</p>';
        setTimeout(() => {
            window.location.href = '../jogo/jogo.html';
        })

    }
}