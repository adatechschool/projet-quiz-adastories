import { quiz_adastories } from './questions.js'; // Import des questions

// DOM affichage
const getQuestion = document.querySelector('.question');
const getOptions = document.querySelector('.options');
const getNextBtn = document.querySelector('#next-button');
const getReplayBtn = document.querySelector('#replay-button');
const scoreAfiche = document.querySelector('#score');

let currentQuestionIndex = 0; 
let scoree= 0 //score 


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

    getOptions.innerText =""
    // injection du texte dans le DOM :
    getQuestion.innerText = currentQuestion.text;

    // ici c'est les options
    for (const option of currentQuestion.options) {
        const addBtnOption = document.createElement("button");

        getOptions.appendChild(addBtnOption);
        addBtnOption.classList.add('button-options') ;
        addBtnOption.innerText = option;
    }
}

getNextBtn.addEventListener('click', () => {
    // Incrémenter l'index de la question
    currentQuestionIndex++;
    scoree++;
    console.log(scoree)
    scoreAfiche.innerText=scoree
    //console.log(currentQuestionIndex)

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

loadQuestion();

getReplayBtn.addEventListener('click', () => {
    currentQuestionIndex = 0
    getReplayBtn.style.display = 'none'
    getNextBtn.style.display = 'inline-block';
     loadQuestion()
})

// évènement au clique sur les options
const optionBtn=document.querySelector(".button-options")

console.log(optionBtn.innerText)
let optionBtnValue=optionBtn.innerText
 
console.log(optionBtnValue)





  