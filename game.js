import {quiz_adastories} from './questions.js';

console.log("coucou")

const getQuestion = document.querySelector('.question')
const getOptions = document.querySelector('#options-container')

const getBtnNext = document.querySelector('#next-button');

 
 let firstQuestion = quiz_adastories.questions[0]

 getQuestion.innertext