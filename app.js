const store = {
  questions: [
    { // question #1
      question: "Which crops were exported from Haiti?",
      answers: [
        "Coffee and Sugar",
        "Tea and Salt",
        "Rubber and Coal",
        "Tobacco and Cotton"
      ],
      correctAnswer: "Coffee and Sugar"
    },
    { // question #2
      question: "Who was the leading general of the Haitian Revolution?",
      answers: [
        "Napoleon Bonaparte",
        "Jean Jacques Dessalines",
        "Hidalgo",
        "Toussaint L'Ouverture"
      ],
      correctAnswer: "Toussaint L'Ouverture"
    },
    { // question #3
      question: "What was the original name of Haiti according to the French.",
      answers: [
        "Turks",
        "St. Domingue",
        "Brazil",
        "Cuba"
      ],
      correctAnswer: "St. Domingue"
    },
    { // question #4
      question: "Which European country had control over Haiti?",
      answers: [
        "Spain",
        "Italy",
        "France",
        "Great Britain"
      ],
      correctAnswer: "France"
    },
    { // question #5
      question: "The slave labor force on Haiti was about _____ people.",
      answers: [
        "2,000",
        "150",
        "500,000",
        "30,0000"
      ],
      correctAnswer: "500,000"
    },
    { // question #6
      question: "The Haitian Revolution was the first completely successful _____ revolt in world history.",
      answers: [
        "Rich landowner",
        "Tea and Salt",
        "Slave",
        "Nationalistic"
      ],
      correctAnswer: "Slave"
    },
    { // question #7
      question: "The Haitian Revolution was influenced mainly by which revolution.",
      answers: [
        "French",
        "American",
        "Spanish American",
        "Russian"
      ],
      correctAnswer: "French"
    },
    { // question #8
      question: "Who won the Haitian Revolution?",
      answers: [
        "The French",
        "Tea and Salt",
        "the Haitian Slaves",
        "The Spanish"
      ],
      correctAnswer: "the Haitian Slaves"
    },
    { // question #9
      question: "As a result of the Haitian Revolution, Haiti created the first ever _____.",
      answers: [
        "black monarchy",
        "black dictatorship",
        "black republic",
        "black oligarchy"
      ],
      correctAnswer: "black republic"
    },
    { // question #10
      question: "What type of tactics did Touissant L'Overture use _____.",
      answers: [
        "Naval attacks",
        "battlefield tactics",
        "trench warfare",
        "guerilla warfare"
      ],
      correctAnswer: "guerilla warfare"
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// return the quiz start landing page html
let returnStartPageHtml = () => {
  return `
  <div class="start-box">
      <h1>The Haitian Revolution Quiz</h1>
      <p>Ready to test your knowledge on the Haitian Revolution? Select the button below to begin!</p>
      <button type="submit" id="start-btn" class="btn">Start Quiz</button>
    </div>
  `;
}

// return the individual quiz page question html
let returnPageQuestionHtml = () => {
  let currentQuestion = store.questions[store.questionNumber];
  return `
  ${currentQuestion.question}
  `;
}

// return the individual quiz page answers html
let returnPageAnswersHtml = () => {
  const pageAnswers = store.questions[store.questionNumber].answers;
  let pageAnswerHtml = "";

  // cycle through the page's answers, and generate the html
  for (let i = 0; i < pageAnswers.length; i++) {
    pageAnswerHtml += `
      <div id="option-container-${i}">
          <input type="radio" name="options" id="option${i + 1}" value="${pageAnswers[i]}" tabindex="${i + 1}" required="">
          <label for="option${i + 1}">${pageAnswers[i]}</label>
      </div>
    `}

  return pageAnswerHtml;
}

// return the what question the user is on, and how many correct answers html
let returnQuizProgress = () => {
  return `
  <div class="question-and-score">
      <ul>
       <li id="question-number"> Question ${store.questionNumber + 1} of ${store.questions.length}</li>
       <li id="quiz-score">${store.score} of ${store.questions.length} Correct</li>
      </ul>
  </div>
  `;
}

// return the question, answer, and the users progress html
let returnCompleteQuestionHtml = () => {
  return `
  <div class="question-box">
    <h1>The Haitian Revolution Quiz</h1>
    <form>
    <legend>${returnPageQuestionHtml()}</legend>
    <fieldset>${returnPageAnswersHtml()}</fieldset>
    <button type="button" id="submit-answer-btn" class="btn">Submit</button>
    </form>
    ${returnQuizProgress()}
  </div>  
  `;
}

// return the result of the users answer submission html
let returnQuestionCorrectResultHtml = () => {
  // assigns the correct answer for the question
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  return `
    <div class="answer-box">
      <h1>The Haitian Revolution Quiz</h1>
      <p>Correct! the answer is ${correctAnswer}! </p>
      <button type="button" id="next-question-btn" class="btn">Next</button>
      ${returnQuizProgress()}
    </div>
  `
}

// return the result of the users answer submission html
let returnQuestionIncorrectResultHtml = () => {
  // assigns the correct answer for the question
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  return `
    <div class="answer-box">
      <h1>The Haitian Revolution Quiz</h1>
      <p>Sorry, the correct answer is ${correctAnswer}. </p>
      <button type="button" id="next-question-btn" class="btn">Next</button>
       ${returnQuizProgress()}
    </div>
    `
}


// return the final quiz results html
let returnQuizResult = () => {
  return `
    <div class="question-box">
      <h1>The Haitian Revolution Quiz</h1>
      <p>
        You answered ${store.score} of ${store.questions.length} correctly.</li>
      </p>
      <button type="button" id="restart-quiz-btn" class="btn">Restart Quiz</button>
    </div>
  `;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

let render = () => {
  if (store.quizStarted === false) {
    // if the quiz hasn't started, return the start page content
    $("main").html(returnStartPageHtml());
    return;
    // else if, the quiz has started, and the question number is less than the questions array length, return the complete question
  } else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
    $("main").html(returnCompleteQuestionHtml());
  } else {
    // and if the quiz has started, and the question number is greater than the question numbers, return the results
    $("main").html(returnQuizResult());
  }
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

let handleStartQuizBtn = () => {
  $("main").on("click", "#start-btn", (event) => {
    store.quizStarted = true;
    console.log("handled Start Quiz Btn");
    render();
  });
}

let handleSubmitAnswerBtn = () => {
  $("main").on("click", "#submit-answer-btn", (event) => {
    event.preventDefault();
    // assigns the correct answer for the question
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    // listens for the users submitted answer and assigns it
    let submittedAnswer = $("input[name=options]:checked").val();

    // checks for a submitted answer, responds with prompt or results based on selection
    if (submittedAnswer === undefined) {
      alert("Please select an answer.");
    } else if (submittedAnswer === correctAnswer) {
      $(".question-box").hide();
      //increments the overall score
      store.score++
      $("main").html(returnQuestionCorrectResultHtml());
      store.questionNumber++
    } else if (submittedAnswer !== correctAnswer) {
      $(".question-box").hide();
      $("main").html(returnQuestionIncorrectResultHtml());
      store.questionNumber++
    }
  });
}

let handleNexQuestionBtn = () => {
  $("main").on("click", "#next-question-btn", (event) => {
    render();
  });
}

let restartQuiz = () => {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
}

let handleRestartQuizBtn = () => {
  $("main").on("click", "#restart-quiz-btn", (event) => {
    restartQuiz();
    render();
  });
}

let handleQuizApp = () => {
  render();
  handleStartQuizBtn();
  handleSubmitAnswerBtn();
  handleNexQuestionBtn();
  handleRestartQuizBtn();
}
$(handleQuizApp);