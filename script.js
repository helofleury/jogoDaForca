let palavraSecreta = '';

function iniciarJogo() {
    palavraSecreta = prompt("Jogador 1, digite a palavra secreta:").toLowerCase().trim();

    if (!palavraSecreta.match(/^[a-z]+$/)) {
        alert("Por favor, digite uma palavra válida.");
        iniciarJogo();
    }

    reiniciarJogo();
}

function reiniciarJogo() {
    letrasAdivinhadas = Array(palavraSecreta.length).fill('_');
    tentativasRestantes = 6;
    letrasUsadas = [];
    atualizarPalavra();
    atualizarTentativas();
    atualizarLetrasUsadas();
}

function atualizarPalavra() {
    const palavraContainer = document.getElementById("palavra-container");
    palavraContainer.textContent = letrasAdivinhadas.join(' ');
}

function atualizarTentativas() {
    const tentativasSpan = document.getElementById("tentativas");
    tentativasSpan.textContent = tentativasRestantes;
}

function atualizarLetrasUsadas() {
    const letrasUsadasSpan = document.getElementById("letras-usadas");
    letrasUsadasSpan.textContent = letrasUsadas.join(', ');
}

function verificarLetra() {
    const letraInput = document.getElementById("letra");
    const letra = letraInput.value.toLowerCase();

    if (letra.length === 1 && letra.match(/[a-z]/i)) {
        if (letrasUsadas.includes(letra)) {
            alert("Você já tentou essa letra!");
        } else {
            letrasUsadas.push(letra);

            if (palavraSecreta.includes(letra)) {
                for (let i = 0; i < palavraSecreta.length; i++) {
                    if (palavraSecreta[i] === letra) {
                        letrasAdivinhadas[i] = letra;
                    }
                }
            } else {
                tentativasRestantes--;
            }

            atualizarPalavra();
            atualizarTentativas();
            atualizarLetrasUsadas();

            if (letrasAdivinhadas.join('') === palavraSecreta) {
                alert("Parabéns! Você venceu! A palavra correta é: "+ palavraSecreta);
                iniciarJogo();
            }

            if (tentativasRestantes === 0) {
                alert("Game Over! A palavra era: " + palavraSecreta);
                iniciarJogo();
            }
        }
    } else {
        alert("Por favor, digite uma letra válida.");
    }

    letraInput.value = '';
}

iniciarJogo();
