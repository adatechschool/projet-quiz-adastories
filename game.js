import { quiz_adastories } from './questions.js'; // Import des questions

// DOM affichage
const getQuestion = document.querySelector('.question');
const getOptions = document.querySelector('.options');
const getNextBtn = document.querySelector('#next-button');
const getReplayBtn = document.querySelector('#replay-button')

let currentQuestionIndex = 0; // Qd tu cliques ça fait + 1

let firstQuestion = quiz_adastories.questions[0]; // faut que ça bouge
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

    getOptions.innerText =""
    // injection du texte dans le DOM :
    getQuestion.innerText = currentQuestion.text;

    // ici c'est les options
    for (const option of currentQuestion.options) {
        const addBtnOption = document.createElement("button");

        getOptions.appendChild(addBtnOption);
        addBtnOption.classList.add('button-options') ;
        addBtnOption.innerText = option;

        addBtnOption.addEventListener('click', () => {
          const optionBtn = document.querySelectorAll('.button-options')

          for(const button of optionBtn){
            button.classList.remove('untrue')
          } // il faut rendre les autres boutons non cliquables

          if (option === currentQuestion.correct_answer) {
            addBtnOption.classList.add('correct')
            console.log("true")
          }
          else {
            addBtnOption.classList.add('untrue')
            console.log("false")
          }
      })
    }
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

loadQuestion();

getReplayBtn.addEventListener('click', () => {
    currentQuestionIndex = 0
    getReplayBtn.style.display = 'none'
    getNextBtn.style.display = 'inline-block';
     loadQuestion()
})