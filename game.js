import { quiz_adastories } from './questions.js'; // Import des questions

// DOM affichage
const getQuestion = document.querySelector('.question');
const getOptions = document.querySelector('.options');
const getNextBtn = document.querySelector('#next-button');
const getReplayBtn = document.querySelector('#replay-button');
const scoreAfiche = document.querySelector('#score');

let currentQuestionIndex = 0; 
let scoree= 0 //score 

function loadQuestion() {
    let currentQuestion = quiz_adastories.questions[currentQuestionIndex];

    getOptions.innerText =""
    // injection du texte dans le DOM :
    getQuestion.innerText = currentQuestion.text;

    // ici c'est les options
    for (const option of currentQuestion.options) {
        const addBtnOption = document.createElement("button");

        getOptions.appendChild(addBtnOption);
        addBtnOption.classList.add('button-options') ;
        addBtnOption.innerText = option;

        // Appelle la fonction checkAnswer pour vérifier la réponse
        addBtnOption.addEventListener('click', checkAnswer);
    }

    getNextBtn.disabled = true;
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
        getQuestion.innerText = 'le quizz est fini';
        getOptions.innerHTML = ''; // Effacer les options
        getNextBtn.style.display = 'none'; // Cacher le bouton Suivant
        getReplayBtn.style.display = 'inline-block'; // Afficher le bouton replay
    }
})

getReplayBtn.addEventListener('click', () => {
    currentQuestionIndex = 0
    scoree = 0
    console.log(scoree)
    scoreAfiche.innerText=scoree;
    getReplayBtn.style.display = 'none'
    getNextBtn.style.display = 'inline-block';
    loadQuestion()
})

// Évènement au clique sur les options :
// La fonction checkAnswer est appelé dans la fonction loadQuestiona avec addEventListerner
function checkAnswer (pointer) {
    //Avec la méthode 'target' on "pointe" la zone dont on veut récupérer la valeur :
    const clickedBtn = pointer.target // permet de récupérer notre bouton
    // On récupère la valeur ici :
    const selectedAnswer = clickedBtn.textContent;
    // console.log(selectedAnswer)

    // On désactive les autres boutons
    const allBtn = document.querySelectorAll('.button-options');
    for (const button of allBtn) {
        button.disabled = true;
    }

    // Condition pour vérifier la réponse
    if (selectedAnswer === quiz_adastories.questions[currentQuestionIndex].correct_answer) {
        clickedBtn.classList.add('correct');
        scoree++;
        console.log(scoree)
        scoreAfiche.innerText=scoree;
    } else {
        clickedBtn.classList.add('untrue');
    }

    getNextBtn.disabled = false;
}

loadQuestion();