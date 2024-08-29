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

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

// Retrieve progress and score from storage
const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || {};
const storedScore = localStorage.getItem('score');

// Function to save the user's answer
function saveAnswer(questionIndex, choice) {
  userAnswers[questionIndex] = choice;
  sessionStorage.setItem('progress', JSON.stringify(userAnswers));
}

// Function to calculate the score
function calculateScore() {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });
  return score;
}

// Display initial score or stored score
if (storedScore) {
  scoreElement.textContent = `Your score is ${storedScore} out of 5.`;
} else {
  scoreElement.textContent = '';
}

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ''; // Clear previous questions
  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    
    // Append question text
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    // Create radio buttons for choices
    question.choices.forEach(choice => {
      const choiceElement = document.createElement('input');
      choiceElement.type = 'radio';
      choiceElement.name = `question-${index}`;
      choiceElement.value = choice;
      choiceElement.onclick = () => saveAnswer(index, choice);
      
      // Check if the current choice is already saved
      if (userAnswers[index] === choice) {
        choiceElement.checked = true;
      }
      
      const choiceLabel = document.createElement('label');
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      
      questionElement.appendChild(choiceLabel);
    });
    questionsElement.appendChild(questionElement);
  });
}

// Handle quiz submission
submitButton.addEventListener('click', () => {
  const score = calculateScore();
  localStorage.setItem('score', score);
  scoreElement.textContent = `Your score is ${score} out of 5.`;
});

// Initial render of questions
renderQuestions();
renderQuestions();
