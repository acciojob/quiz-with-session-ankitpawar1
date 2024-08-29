//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};
const questionsElement = document.getElementById('questions');
const scoreElement = document.getElementById('score');
const submitButton = document.getElementById('submit');

function renderQuestions() {
  questionsElement.innerHTML = '';
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement('div');
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    question.choices.forEach(choice => {
      const choiceElement = document.createElement('input');
      choiceElement.setAttribute('type', 'radio');
      choiceElement.setAttribute('name', `question-${i}`);
      choiceElement.setAttribute('value', choice);
      if (userAnswers[`question-${i}`] === choice) {
        choiceElement.checked = true;
      }
      
      choiceElement.addEventListener('change', (e) => {
        userAnswers[`question-${i}`] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });

      const label = document.createElement('label');
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
    });

    questionsElement.appendChild(questionElement);
  }
}

function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[`question-${i}`] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

function showScore(score) {
  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score);
}

submitButton.addEventListener('click', () => {
  const score = calculateScore();
  showScore(score);
});

// Initial render of questions
renderQuestions();
