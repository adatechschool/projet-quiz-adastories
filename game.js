import { quiz_adastories } from './questions.js'; // Import des questions

// DOM affichage
const getQuestion = document.querySelector('.question');
const getOptions = document.querySelector('.options');
const getNextBtn = document.querySelector('#next-button');
const getReplayBtn = document.querySelector('#replay-button');
const scoreAffiche = document.querySelector('#score');

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

        // On appelle la fonction bravo pour faire afficher un GIF selon le score
        finalScore();
    }
})

// LEYANE
getReplayBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;

    // console.log(score);
    scoreAffiche.innerText = score;
    getReplayBtn.style.display = 'none';
    getNextBtn.style.display = 'inline-block';

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
    } else {
        clickedBtn.classList.add('untrue'); // CSS
    }

    getNextBtn.disabled = false; // Réactive le bouton
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
        getOptions.appendChild(addDiv).textContent = `Vous êtes trop forts ! Score = ${score}/${arrayLength}`;

        gif.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJ3NXNtNGRqNTMza3k5NnpuZjdhZXdyZ21zejgzZHZ4bjVqbXN5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MOWPkhRAUbR7i/giphy.gif'
        gif.alt = "Félicitations";
        getOptions.appendChild(gif);
    } else if (score > medium) {
        // On affiche le score final
        getOptions.appendChild(addDiv).textContent = `On est proche ! Score = ${score}/${arrayLength}`;

        gif.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2t1OWxtN2N0b2V0YzUwMWdidjVxaDF3ZWhjb3hranJrbjV4OHVnayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1URYTNvDM2LJoMIdxE/giphy.gif'
        gif.alt = "On est proche !";
        getOptions.appendChild(gif);
    } else if (score === medium) {
        // On affiche le score final
        getOptions.appendChild(addDiv).textContent = `C\'est pas mal ! Score = ${score}/${arrayLength}`;

        gif.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExczluYjd5MGc3ZzB0ZTdiNWkwOHdncW5zMmZzbDR3cm95bDZ3eDExcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9xijGdDIMovchalhxN/giphy.gif'
        gif.alt = "Pas mal !";
        getOptions.appendChild(gif);
    } else if (score < medium && score > 0) {
        // On affiche le score final
        getOptions.appendChild(addDiv).textContent = `Allez, tu peux mieux faire ! Score = ${score}/${arrayLength}`;

        gif.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2sxNjcxYngxMTF2a3Rha3VsdGhpbWI5bHVvc3l1MG5wMWlseHZ0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R4B99GWm99hn3tFlz0/giphy.gif'
        gif.alt = "Peux mieux faire !";
        getOptions.appendChild(gif);
    } else if (score === 0) {
        // On affiche le score final
        getOptions.appendChild(addDiv).textContent = `C\'est nul ! Score = ${score}/${arrayLength}`;

        gif.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExejViYnNuMmZmYThiMHFiNjBjMTNnZHp0MjZtd3dzdjR1bDYzY2UzeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/06ICMm65hcawzW3Dst/giphy.gif'
        gif.alt = "Nul !";
        getOptions.appendChild(gif);
    }
}

// Charge la question à l'ouverture
loadQuestion();