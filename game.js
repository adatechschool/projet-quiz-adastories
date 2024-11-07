import { quiz_adastories } from './questions.js'; // Import des questions

// DOM affichage
const getQuestion = document.querySelector('.question');
const getOptions = document.querySelector('.options');
const getNextBtn = document.querySelector('#next-button');
const getReplayBtn = document.querySelector('#replay-button');
const scoreAffiche = document.querySelector('#score');
const gifContainer = document.querySelector('.gif-container');
const divFinalScore = document.querySelector('.div-final-score');

let currentQuestionIndex = 0; 
let score = 0;

// Ici on charge le question :
function loadQuestion() {
    // Cette variable va chercher la question selon son index.
    // L'index est stocké dans la variable currentQuestionIndex (qui est juste au-dessus).
    let currentQuestion = quiz_adastories.questions[currentQuestionIndex];

    getOptions.innerText = "";
    // Récupération du texte dans le tableau questions
    getQuestion.innerText = currentQuestion.text;

    // Ici c'est les options
    for (const option of currentQuestion.options) {
        const addBtnOption = document.createElement("button");

        getOptions.appendChild(addBtnOption); // Ici on place notre bouton dans le dic avec la classe options
        addBtnOption.classList.add('button-options') ; // Ici pour le CSS, ajoute une classe au bouton
        addBtnOption.innerText = option;

        // Appelle la fonction checkAnswer pour vérifier la réponse :
        addBtnOption.addEventListener('click', checkAnswer); // À chaque clique sur le bouton, la réponse à vérifier
    }

    getNextBtn.disabled = true; // Désactive le bouton
}

getNextBtn.addEventListener('click', () => {
    // Incrémenter l'index de la question
    currentQuestionIndex++;

    // Vérifier s'il reste des questions
    if (currentQuestionIndex < quiz_adastories.questions.length) {
        // Afficher la question suivante
        loadQuestion();
    } else {
       // Si plus de questions, indiquer la fin du quiz
        getQuestion.innerText = 'Le quiz est fini !';
        getOptions.innerHTML = ''; // Effacer les options
        getNextBtn.style.display = 'none'; // Cache le bouton Suivant
        getReplayBtn.style.display = 'inline-block'; // Affiche le bouton replay

        // On appelle la fonction pour faire afficher un GIF selon le score
        finalScore();
    }
})

getReplayBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;

    score = 0;
    scoreAffiche.innerText = score;

    getReplayBtn.style.display = 'none';
    getNextBtn.style.display = 'inline-block';

    // Nettoyer et cacher les conteneurs score final et gif
    gifContainer.innerHTML = '';
    divFinalScore.innerHTML = '';

    loadQuestion();
})

// La fonction checkAnswer est appelé dans la fonction loadQuestiona avec addEventListerner
function checkAnswer (pointer) {

    // Avec la méthode 'target' on "pointe" la zone dont on veut récupérer la valeur :
    const clickedBtn = pointer.target; // On pointe le bouton
    const selectedAnswer = clickedBtn.textContent; // On récupère le valeur du bouton pointé

    const allBtn = document.querySelectorAll('.button-options');
    // On désactive les autres boutons
    for (const button of allBtn) {
        button.disabled = true; // Désactive le bouton
    }

    // Condition pour vérifier la réponse
    if (selectedAnswer === quiz_adastories.questions[currentQuestionIndex].correct_answer) {
        clickedBtn.classList.add('correct'); // CSS

        score++;
        scoreAffiche.innerText = score;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        clickedBtn.classList.add('untrue'); // CSS
    }

    getNextBtn.disabled = false; // Réactive le bouton
}

// Ici une fonction qui affiche un GIF selon le score
function finalScore() {
    const arrayLength = quiz_adastories.questions.length;
    const medium = arrayLength/2;

    // S'assure que les conteneurs sont vides avant d'ajoute du nouveau contenu
    gifContainer.innerHTML = '';
    divFinalScore.innerHTML = '';

    // Créer l'image
    const img = document.createElement('img');
    img.classList.add('gif');

    // Définir le contenu selon le score
    if (score === arrayLength) {
        divFinalScore.textContent = `Vous êtes trop forts ! Score = ${score}/${arrayLength}`;
        img.src = 'https://i.giphy.com/media/MOWPkhRAUbR7i/giphy.gif';
        img.alt = "Félicitations";
    } else if (score > medium && score < arrayLength) {
        divFinalScore.textContent = `On est proche ! Score = ${score}/${arrayLength}`;
        img.src = 'https://i.giphy.com/media/NUwoRZzHc2Bws/giphy.gif';
        img.alt = "On est proche !";
    } else if (score === medium) {
        divFinalScore.textContent = `C'est pas mal ! Score = ${score}/${arrayLength}`;
        img.src = 'https://i.giphy.com/media/9xijGdDIMovchalhxN/giphy.gif';
        img.alt = "Pas mal !";
    } else if (score < medium && score > 0) {
        divFinalScore.textContent = `Allez, tu peux mieux faire ! Score = ${score}/${arrayLength}`;
        img.src = 'https://i.giphy.com/media/R4B99GWm99hn3tFlz0/giphy.gif';
        img.alt = "Peux mieux faire !";
    } else if (score === 0) {
        divFinalScore.textContent = `C'est nul ! Score = ${score}/${arrayLength}`;
        img.src = 'https://i.giphy.com/media/06ICMm65hcawzW3Dst/giphy.gif';
        img.alt = "Nul !";
    }

    gifContainer.appendChild(img);
}

// Charge la question à l'ouverture
loadQuestion();