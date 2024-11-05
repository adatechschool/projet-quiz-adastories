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

    // Ajouter l'écouteur d'événement qui va vérifier la réponse
    // addBtnOption.addEventListener('click', checkAnswer); // On n'y a pas accés car n'est pas dans la boucle
    // options.addEventListener('click', checkAnswer); // Génère un bug car le addEventListener est sur le container option => ça élargie la zone pour le target

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


    // Conditions pour véréfier les réponses :
    if (selectedAnswer === correctAnswer) {
        // clickedBtn.classList.remove('button-options') // On peut apparemment mettre plusieurs class dans une div
        clickedBtn.classList.add('correct');

        // On incrémente le score :
        score++;
        console.log("score: ", score)

        // DOM :
        scoreboard.textContent = score;
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
    console.log("moitié: ", medium);

    // Pour permettre la réutilisation dans la condition qui suit :
    const gif = document.createElement('img');
    const addDiv = document.createElement('div');
    addDiv.classList.add('gif')
    gif.className = "gif";

    if (score === arrayLength) {
        // On affiche le score final
        options.appendChild(addDiv).textContent = `Vous êtes trop forts ! Score = ${score}/${arrayLength}`;

        gif.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJ3NXNtNGRqNTMza3k5NnpuZjdhZXdyZ21zejgzZHZ4bjVqbXN5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MOWPkhRAUbR7i/giphy.gif'
        gif.alt = "Félicitations";
        options.appendChild(gif);
    } else if (score > medium) {
        // On affiche le score final
        options.appendChild(addDiv).textContent = `On est proche ! Score = ${score}/${arrayLength}`;

        gif.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2t1OWxtN2N0b2V0YzUwMWdidjVxaDF3ZWhjb3hranJrbjV4OHVnayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1URYTNvDM2LJoMIdxE/giphy.gif'
        gif.alt = "Pas mal";
        options.appendChild(gif);
    } else if (score === medium) {
        // On affiche le score final
        options.appendChild(addDiv).textContent = `C\'est pas mal ! Score = ${score}/${arrayLength}`;

        gif.src = ''
        gif.alt = "Pas mal !";
        options.appendChild(gif);
    } else if (score < medium && score > 0) {
        // On affiche le score final
        options.appendChild(addDiv).textContent = `Allez, tu peux mieux faire ! Score = ${score}/${arrayLength}`;

        gif.src = './images/DALL·E Manga Illustration (1).webp'
        gif.alt = "Peux mieux faire !";
        options.appendChild(gif);
    } else if (score === 0) {
        // On affiche le score final
        options.appendChild(addDiv).textContent = `C\'est nul ! Score = ${score}/${arrayLength}`;

        gif.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExejViYnNuMmZmYThiMHFiNjBjMTNnZHp0MjZtd3dzdjR1bDYzY2UzeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/06ICMm65hcawzW3Dst/giphy.gif'
        gif.alt = "Nul !";
        options.appendChild(gif);
    }
}

// Permet de charger la question à l'ouverture de la page
loadQuestion()