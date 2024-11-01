import { quiz_adastories } from './questions.js'; // Import des questions

// DOM affichage
const getQuestion = document.querySelector('.question');
// console.log(getQuestion);
const getOptions = document.querySelector('.options');
// console.log(getOptions);
const getNextBtn = document.querySelector('#next-button');
// console.log(getNextBtn);

let firstQuestion = quiz_adastories.questions[0];
// console.log(firstQuestion);

// injection du texte dans le DOM :
getQuestion.innerText = firstQuestion.text;

for (const option of firstQuestion.options) {
    const addBtnOption = document.createElement("button");

    getOptions.appendChild(addBtnOption);
    addBtnOption.classList.add('button-options') ;
    addBtnOption.innerText = option;
}