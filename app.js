const questions = [
    {
        question: 'Which is the largest animal in the world?',
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Blue Whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Giraffe', correct: false },
        ]
    },
    {
        question: 'Which is the smallest country in the world?',
        answers: [
            { text: 'Pakistan', correct: false },
            { text: 'India', correct: false },
            { text: 'Hungary', correct: false },
            { text: 'Vatican City', correct: true },
        ]
    },
    {
        question: 'Which is the largest desert in the world?',
        answers: [
            { text: 'Sahara', correct: false },
            { text: 'Gobi', correct: false },
            { text: 'Antarctica', correct: true },
            { text: 'Arctic', correct: false },
        ]
    },
    {
        question: 'Which is the 2nd most beautiful capital in the world?',
        answers: [
            { text: 'Islamabad', correct: true },
            { text: 'Washington D.C.', correct: false },
            { text: 'Tokyo', correct: false },
            { text: 'Ankara', correct: false },
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answer, button) {
    const buttons = Array.from(answerButtonsElement.children);
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn === button) {
            btn.classList.add(answer.correct ? 'correct' : 'incorrect');
        }
    });
    nextButton.classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionElement.innerHTML = `Quiz completed! Your score is ${score}/${questions.length}.`;
    answerButtonsElement.innerHTML = '';
    nextButton.innerHTML = 'Restart';
    nextButton.classList.remove('hide');
    nextButton.removeEventListener('click', nextQuestion);
    nextButton.addEventListener('click', startQuiz);
}

nextButton.addEventListener('click', nextQuestion);

startQuiz();


