import { quiz_adastories } from './questions.js'; // Import des questions

// Pour suivre a question actuelle
let currentQuestionIndex = 0;
let score = 0;

// DOM affichage
const question = document.querySelector('.question');
const options = document.querySelector('.options');
const nextBtn = document.querySelector('#next-button');
const replayBtn = document.querySelector('#replay-button');
const scoreboard = document.querySelector('#scoreboard');
const gifContainer = document.querySelector('.gif-container');
const divFinalScore = document.querySelector('.div-final-score');

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

        addBtnOption.addEventListener('click', checkAnswer);
    }

    // Après que la réponse soit vérifiée par la fonction checkAnswer, on désactive à nouveau le bouton suivant avant de sélectionner une option/réponse.
    nextBtn.disabled = true;
}

// Évènement au clique que le bouton suivant :
nextBtn.addEventListener('click', () => {

    // Incrémenter l'index de la question
    currentQuestionIndex++;

    // Vérifier s'il reste des questions
    if (currentQuestionIndex < quiz_adastories.questions.length) {
        loadQuestion();
    } else {
        // Si plus de questions, indiquer la fin du quiz
        question.innerText = 'Le quiz est terminé !';
        options.innerHTML = ''; // Effacer les options
        nextBtn.style.display = 'none'; // Cacher le bouton Suivant
        replayBtn.style.display = 'inline-block'; // Afficher le bouton Rejouer

        // On appelle la fonction bravo pour faire afficher un GIF selon le score
        finalScore();
    }
})

// Fonction pour réinitialiser le quiz
replayBtn.addEventListener('click', () => {
    // Réinitialiser l'index
    currentQuestionIndex = 0;

    // Cacher le bouton Rejouer et afficher le bouton Suivant
    replayBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';

    // Nettoyer et cacher les conteneurs
    gifContainer.innerHTML = '';
    divFinalScore.innerHTML = '';


    // Recharger la première question
    loadQuestion()

    // Remet à zéro le score
    score = 0;
});

// Ici on vérifie les réponses :
function checkAnswer(element) {

    const clickedBtn = element.target;
    // console.log(clickedBtn)
    const selectedAnswer = clickedBtn.innerText;
    // console.log(selectedAnswer);

    // Il faut désactiver les bouttons quand on a cliqué :
    const allBtn = document.querySelectorAll('.button-options');
    allBtn.forEach(button => {
        button.disabled = true;
    } )

    // Et il faut réactiver le bouton suivant :
    nextBtn.disabled = false; // Ne fonctionne que pour la première question si on ne mat

    // Récupérer la bonne réponse selon l'index de la question :
    let correctAnswer = quiz_adastories.questions[currentQuestionIndex].correct_answer
    console.log('Variable correcte answer: ', correctAnswer)


    // Conditions pour vérifier les réponses :
    if (selectedAnswer === correctAnswer) {
        // clickedBtn.classList.remove('button-options') // On peut apparemment mettre plusieurs class dans une div
        clickedBtn.classList.add('correct');

        // On incrémente le score :
        score++;
        console.log("score: ", score)

        // DOM :
        scoreboard.textContent = `Score: ${score}`;
    } else {
        // clickedBtn.classList.remove('button-options') // On peut apparemment mettre plusieurs class dans une div
        clickedBtn.classList.add('untrue');
    }
}

// Ici une fonction qui affiche un GIF selon le score
// Il faut nettoyer c'est pas propre
function finalScore () {
    const arrayLength = quiz_adastories.questions.length;
    const medium = arrayLength/2;

    // S'assure que les conteneurs sont vides avant d'ajoute du nouveau contenu
    gifContainer.innerHTML = '';
    divFinalScore.innerHTML = '';

    // Créer l'image
    const img = document.createElement('img');
    img.classList.add('gif');

    if (score === arrayLength) {
        divFinalScore.textContent = `Vous êtes trop forts ! Score = ${score}/${arrayLength}`;
        img.src = 'https://i.giphy.com/media/MOWPkhRAUbR7i/giphy.gif';
        img.alt = "Félicitations";
    } else if (score > medium) {
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
        options.appendChild(gif);
    } else if (score === 0) {
        divFinalScore.textContent = `C'est nul ! Score = ${score}/${arrayLength}`;
        img.src = 'https://i.giphy.com/media/06ICMm65hcawzW3Dst/giphy.gif';
        img.alt = "Nul !";
    }

    gifContainer.appendChild(img);
}

// Permet de charger la question à l'ouverture de la page
loadQuestion()