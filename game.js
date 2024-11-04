import { quiz_adastories } from './questions.js'; // Import des questions

// DOM affichage
const getQuestion = document.querySelector('.question');
const getOptions = document.querySelector('.options');
const getNextBtn = document.querySelector('#next-button');

let currentQuestionIndex = 0; // Qd tu cliques ça fait + 1

let firstQuestion = quiz_adastories.questions[3]; // faut que ça bouge
// console.log(firstQuestion);0

// Ici on affiche les options
// for (const option of firstQuestion.options) {
//     const addBtnOption = document.createElement("button");
//
//     getOptions.appendChild(addBtnOption);
//     addBtnOption.classList.add('button-options') ;
//     addBtnOption.innerText = option;
// }

function loadQuestion() {
    let currentQuestion = quiz_adastories.questions[currentQuestionIndex];
    console.log(currentQuestion);

    // injection du texte dans le DOM :
    getQuestion.innerText = currentQuestion.text;

    // ici c'est les options
    for (const option of firstQuestion.options) {
        const addBtnOption = document.createElement("button");

        getOptions.appendChild(addBtnOption);
        addBtnOption.classList.add('button-options') ;
        addBtnOption.innerText = option;
    }
}

loadQuestion();