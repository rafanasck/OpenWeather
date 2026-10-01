const chave = "f1f8685a94abd86673692376a8b961e9";

async function buscarClima() {
    const cidade = document.getElementById("cidade").value;
    const resultado = document.getElementById("resultado");
    const mensagem = document.getElementById("mensagem");

    if (cidade === "") {
        mensagem.textContent = "Digite o nome de uma cidade.";
        resultado.innerHTML = "";
        return;
    }

    mensagem.textContent = "Carregando...";
    resultado.innerHTML = "";

    try {
        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`
        );

        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }

        const dados = await resposta.json();

        const temperatura = Math.round(dados.main.temp);
        const sensacao = Math.round(dados.main.feels_like);

        resultado.innerHTML = `
            <div class="card">
                <h2>${dados.name}</h2>

                <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png">

                <div class="temperatura">${temperatura}°C</div>

                <p class="descricao">${dados.weather[0].description}</p>

                <div class="informacoes">
                    <div class="info">
                        <strong>Sensação térmica</strong>
                        <span>${sensacao}°C</span>
                    </div>

                    <div class="info">
                        <strong>Umidade</strong>
                        <span>${dados.main.humidity}%</span>
                    </div>
                </div>
            </div>
        `;

        mensagem.textContent = "";

    } catch (erro) {
        mensagem.textContent = "Não foi possível encontrar essa cidade.";
        resultado.innerHTML = "";
    }
}