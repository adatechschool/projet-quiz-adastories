import {quiz_adastories} from "./questions.js";

const getQuestion = document.querySelector('.question')
// console.log("question" + " " + getQuestion.innerText)
const getOptions = document.querySelector('.options')
// console.log("options" + " " + getOptions.innerText)
const getNextBtn = document.querySelector('#next-button')

let firstQuestion = quiz_adastories.questions[0]
// console.log(firstQuestion)
