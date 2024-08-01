function configurarEstilosMarcador(resultado) {
    const marcador = document.getElementById("marcador");
    const telaCheia = document.getElementById("tela-cheia");

    if (marcador) {
        const estilos = {
            1: { gridColumn: "1 / 2", gridRow: "2 / 3" },
            2: { gridColumn: "1 / 2", gridRow: "3 / 4" },
            3: { gridColumn: "1 / 2", gridRow: "4 / 5" },
            4: { gridColumn: "1 / 2", gridRow: "5 / 6" },
            5: { gridColumn: "2 / 3", gridRow: "5 / 6" },
            6: { gridColumn: "3 / 4", gridRow: "5 / 6" },
            7: { gridColumn: "3 / 4", gridRow: "4 / 5" },
            8: { gridColumn: "3 / 4", gridRow: "3 / 4" },
            9: { gridColumn: "3 / 4", gridRow: "2 / 3" },
            10: { gridColumn: "4 / 5", gridRow: "2 / 3" },
            11: { gridColumn: "5 / 6", gridRow: "2 / 3" },
            12: { gridColumn: "6 / 7", gridRow: "2 / 3" },
            13: { gridColumn: "6 / 7", gridRow: "3 / 4" },
            14: { gridColumn: "6 / 7", gridRow: "4 / 4" },
            15: { gridColumn: "6 / 7", gridRow: "5 / 5" },
            16: { gridColumn: "7 / 8", gridRow: "5 / 7" },
            17: { gridColumn: "8 / 9", gridRow: "5 / 6" },
            18: { gridColumn: "8 / 9", gridRow: "4 / 6" },
            19: { gridColumn: "8 / 9", gridRow: "3 / 4" },
            20: { gridColumn: "8 / 9", gridRow: "2 / 3" },
            21: { gridColumn: "8 / 9", gridRow: "1 / 2" },
            0: { gridColumn: "1 / 2", gridRow: "1 / 2" }
        };

        const estilo = estilos[resultado] || { gridColumn: "", gridRow: "" };

        marcador.style.gridColumn = estilo.gridColumn;
        marcador.style.gridRow = estilo.gridRow;
        if (resultado >= 0) {
            setTimeout(() => {
                telaCheia.style.display = "block";
            }, 1000)
        } else {
            telaCheia.style.display = "none";
        }


    }
}
function configurarEstilosMarcadorVoltarCasa(valorVoltarCasa) {
    const marcador = document.getElementById("marcador");
    const telaCheia = document.getElementById("tela-cheia");

    if (marcador) {
        const estilos = {
            1: { gridColumn: "1 / 2", gridRow: "2 / 3" },
            2: { gridColumn: "1 / 2", gridRow: "3 / 4" },
            3: { gridColumn: "1 / 2", gridRow: "4 / 5" },
            4: { gridColumn: "1 / 2", gridRow: "5 / 6" },
            5: { gridColumn: "2 / 3", gridRow: "5 / 6" },
            6: { gridColumn: "3 / 4", gridRow: "5 / 6" },
            7: { gridColumn: "3 / 4", gridRow: "4 / 5" },
            8: { gridColumn: "3 / 4", gridRow: "3 / 4" },
            9: { gridColumn: "3 / 4", gridRow: "2 / 3" },
            10: { gridColumn: "4 / 5", gridRow: "2 / 3" },
            11: { gridColumn: "5 / 6", gridRow: "2 / 3" },
            12: { gridColumn: "6 / 7", gridRow: "2 / 3" },
            13: { gridColumn: "6 / 7", gridRow: "3 / 4" },
            14: { gridColumn: "6 / 7", gridRow: "4 / 4" },
            15: { gridColumn: "6 / 7", gridRow: "5 / 5" },
            16: { gridColumn: "7 / 8", gridRow: "5 / 7" },
            17: { gridColumn: "8 / 9", gridRow: "5 / 6" },
            18: { gridColumn: "8 / 9", gridRow: "4 / 6" },
            19: { gridColumn: "8 / 9", gridRow: "3 / 4" },
            20: { gridColumn: "8 / 9", gridRow: "2 / 3" },
            21: { gridColumn: "8 / 9", gridRow: "1 / 2" },
            0: { gridColumn: "1 / 2", gridRow: "1 / 2" }
        };

        const estilo = estilos[valorVoltarCasa] || { gridColumn: "", gridRow: "" };

        marcador.style.gridColumn = estilo.gridColumn;
        marcador.style.gridRow = estilo.gridRow;
        telaCheia.style.display = "none";
    }
}
