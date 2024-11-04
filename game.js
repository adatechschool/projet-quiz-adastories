import { quiz_adastories } from './questions.js'; // Import des questions

// Pour suivre a question actuelle
let currentQuestionIndex = 0;

// DOM affichage
const question = document.querySelector('.question');
const options = document.querySelector('.options');
const nextBtn = document.querySelector('#next-button');
const replayBtn = document.querySelector('#replay-button');

// Ici on charge la question et ses options :
function loadQuestion() {

    // Vider le conteneur des options
    options.innerHTML = '';

    // Récupère la question actuelle
    let currentQuestion = quiz_adastories.questions[currentQuestionIndex]; // Pour pouvoir accéder à cette variable je dois la mettre en globale

    // injection du texte dans le DOM :
    question.innerText = currentQuestion.text;

    for (const option of currentQuestion.options) {
        const addBtnOption = document.createElement("button");

        options.appendChild(addBtnOption);
        addBtnOption.classList.add('button-options');
        addBtnOption.innerText = option;
    }

    // Ajouter l'écouteur d'événement qui va vérifier la réponse
    options.addEventListener('click', checkAnswer);

    // Après que la réponse soit vérifiée par la fonction checkAnswer, on désactive à nouveau le bouton suivant avant de sélectionner une option/réponse.
    nextBtn.disabled = true;
}

// Évènement au clique que le bouton suivant :
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

// Ici on vérifie les réponses :
function checkAnswer(choice) {

    const clickedBtn = choice.target;
    const selectedAnswer = clickedBtn.innerText;
    console.log(selectedAnswer);

    // Il faut désactiver les bouttons quand on a cliqué :
    const allBtn = document.querySelectorAll('.button-options');
    allBtn.forEach(button => {
        button.disabled = true;
    } )

    // Et il faut réactiver le bouton suivant :
    nextBtn.disabled = false; // Ne fonctionne que pour la première question si on ne mat

    // Récupérer la bonne réponse selon l'index de la question :
    let correctAnswer = quiz_adastories.questions[currentQuestionIndex].correct_answer
    // console.log(correctAnswer)

    // Conditions pour véréfier les réponses :
    if (selectedAnswer === correctAnswer) {
        console.log('La réponse est bonne')
        clickedBtn.classList.remove('button-options')
        clickedBtn.classList.add('correct');
    } else {
        console.log('La réponse est fausse')
        clickedBtn.classList.remove('button-options')
        clickedBtn.classList.add('untrue');
    }
}

loadQuestion()