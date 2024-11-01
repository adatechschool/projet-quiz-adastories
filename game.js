import { quiz_adastories } from './questions.js'; // Import des questions

// Pour suivre a question actuelle
let currentQuestionIndex = 0;

// DOM affichage
const question = document.querySelector('.question');
// console.log(getQuestion);
const options = document.querySelector('.options');
// console.log(getOptions);
const nextBtn = document.querySelector('#next-button');
// console.log(getNextBtn);
const replayBtn = document.querySelector('#replay-button');

function loadQuestion() {

    // Vider le conteneur des options
    options.innerHTML = '';

    // Récupère la question actuelle
    let currentQuestion = quiz_adastories.questions[currentQuestionIndex];
    // console.log("index: ", currentQuestionIndex);
    // console.log('question: ', currentQuestion);

    // injection du texte dans le DOM :
    question.innerText = currentQuestion.text;

    for (const option of currentQuestion.options) {
        const addBtnOption = document.createElement("button");

        options.appendChild(addBtnOption);
        addBtnOption.classList.add('button-options') ;
        addBtnOption.innerText = option;
    }
}

nextBtn.addEventListener('click', () => {

    // Incrémenter l'index de la question
    currentQuestionIndex++;

    // Vérifier s'il reste des questions
    if (currentQuestionIndex < quiz_adastories.questions.length) {
        // console.log("On n'est pas à la fin");
        // Afficher la question suivante
        loadQuestion();
    } else {
        // console.log("Il n'y a plus de question");
        // Si plus de questions, indiquer la fin du quiz
        question.innerText = 'Le quiz est terminé !';
        options.innerHTML = ''; // Effacer les options
        nextBtn.style.display = 'none'; // Cacher le bouton Suivant
        replayBtn.style.display = 'inline-block'; // Afficher le bouton Rejouer
    }
})

// Fonction pour réinitialiser le quiz
replayBtn.addEventListener('click', () => {
    // Réinitialiser l'index
    currentQuestionIndex = 0;
    // Cacher le bouton Rejouer et afficher le bouton Suivant
    replayBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    // Recharger la première question
    loadQuestion()
});

function checkAnswer() {

}

loadQuestion()