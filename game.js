let currentStage = 0;
let showingMap = false;
const gameConfig = [
    {
        riddle: "Antes de partirmos para a GRAND LINE, precisamos de um plano. Onde o bando se reune para ver o mapa e descansar da última ilha?",
        answer: "sala",
        mapSrc: "img/OP_MAPA_1.png",
        xTop: "10%",
        xLeft: "60%"
    },
    {
        riddle: "O estômago de Luffy está roncando! Para o capitão não comer a tripulação, vá até o reino de Sanji, onde o fogo e o metal criam o banquete real.",
        answer: "cozinha",
        mapSrc: "img/OP_MAPA_2.png",
        xTop: "60%",
        xLeft: "15%"
    },
    {
        riddle: "Enfrentamos uma tempestade gigante e todas as capas de pirata ficaram encharcadas! Onde as roupas rodam e a espuma limpa a sujeira do mar?",
        answer: "lavanderia",
        mapSrc: "img/OP_MAPA_3.png",
        xTop: "30%",
        xLeft: "50%"
    },
    {
        riddle: "Até um futuro rei dos piratas precisa de um sono profundo para recuperar o HAKI. Procure onde os sonhos de encontrar o ONE PIECE ganham vida todas as noites.",
        answer: "quarto",
        mapSrc: "img/OP_MAPA_4.png",
        xTop: "60%",
        xLeft: "40%"
    },
    {
        riddle: "O destino final! Onde o cheiro de carne assada atrai o Luffy de quilômetros de distância. O ONE PIECE está onde a festa acontece e o fogo queima alto!",
        answer: "churrasqueira",
        mapSrc: "img/OP_MAPA_5.png",
        xTop: "25%",
        xLeft: "10%"
    },
];

const startContainer = document.getElementById('start-container');
const riddleContainer = document.getElementById('riddle-container');
const mapContainer = document.getElementById('map-container');
const hintElement = document.getElementById('hint-box');
const answerInput = document.getElementById('answer');
const msgElement = document.getElementById('message');
const mapImage = document.getElementById('map-image');
const treasureX = document.getElementById('treasure-x');

function startGame() {
    startContainer.style.display = "none";
    riddleContainer.style.display = "block";
    answerInput.focus();
}

answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
    }
});

function checkAnswer() {
    const userInput = answerInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const answer = gameConfig[currentStage].answer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    if (userInput === answer) {
        msgElement.style.color = "green";
        msgElement.innerText = "BRILHANTE! O mapa apareceu. Procure o X!";

        mapImage.src = gameConfig[currentStage].mapSrc;
        treasureX.style.top = gameConfig[currentStage].xTop;
        treasureX.style.left = gameConfig[currentStage].xLeft;

        setTimeout(() => {
            riddleContainer.style.display = "none";
            mapContainer.style.display = "block";
            msgElement.innerText = "";
            answerInput.value = "";
        }, 1500);
    } else {
        msgElement.style.color = "red";
        msgElement.innerText = "Hmm, não parece certo. Tente de novo!";
    }
}

function advanceFromMap() {
    currentStage++;
    if (currentStage < gameConfig.length) {
        mapContainer.style.display = "none";
        riddleContainer.style.display = "block";
        hintElement.innerText = gameConfig[currentStage].riddle;
        answerInput.focus();
    } else {
        document.getElementById('main-container').innerHTML = `
            <div style="position: relative; text-align: center; width: 100%; max-width: 800px;">
                <button onclick="location.reload()" style="position: absolute; top: -50px; right: 0; padding: 10px 15px; font-size: 14px; background-color: #d35400; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                    🔄 JOGAR NOVAMENTE
                </button>
                
                <h1>VOCÊ VENCEU! O tesouro é seu! 🏴‍☠️</h1>
                
                <img src="img/OP_TESOURO.png"
                     style="width: 100%; border-radius: 15px; border: 5px solid #d35400; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            </div>
        `;
    }
}
