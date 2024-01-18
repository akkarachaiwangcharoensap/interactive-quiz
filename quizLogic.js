// Define quiz questions and answers
const quizData = [
    {
        question: "What is the standard voltage used for electrical outlets in North America?",
        answers: ["110V", "120V", "220V", "240V"],
        correctAnswer: "120V"
    },
    {
        question: "Which type of transportation is typically the fastest for long-distance travel?",
        answers: ["Bus", "Train", "Plane", "Car"],
        correctAnswer: "Plane"
    },
    {
        question: "What is the currency used in Japan?",
        answers: ["Yen", "Won", "Baht", "Ringgit"],
        correctAnswer: "Yen"
    },
    {
        question: "What should you do if you lose your passport while traveling?",
        answers: [
            "Ignore it and continue your trip",
            "Report it to the local police and embassy",
            "Wait until you return home to report it",
            "Replace it at a nearby post office"
        ],
        correctAnswer: "Report it to the local police and embassy"
    },
    {
        question: "In which season is it summer in the Southern Hemisphere?",
        answers: [
            "Winter",
            "Spring",
            "Summer",
            "Fall"
        ],
        correctAnswer: "Winter"
    }
];

let currentQuestion = 0;
let userAnswers = [];

/**
 * The start of the quiz.
 */
function initQuiz()
{
    showQuestion();
}

/**
 * Show the current questionaire.
 */
function showQuestion()
{
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const currentQuizData = quizData[currentQuestion];

    questionText.textContent = currentQuizData.question;
    answersContainer.innerHTML = "";

    // Create HTML answers list in each question.
    currentQuizData.answers.forEach((answer, index) =>
    {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.textContent = answer;
        answerElement.onclick = () => selectAnswer(index);

        answersContainer.appendChild(answerElement);
    });

    highlightSelectedAnswer();
}

/**
 * Selecting an answer will add a class `selected`
 * to highlight the selected answer.
 */
function selectAnswer(index)
{
    userAnswers[currentQuestion] = index;
    highlightSelectedAnswer();
}

/**
 * Add `selected` class to the selected answer to stylize.
 */
function highlightSelectedAnswer()
{
    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach((answerElement, index) =>
    {
        // Remove any existing `selected` class.
        answerElement.classList.remove('selected');

        if (index === userAnswers[currentQuestion])
        {
            answerElement.classList.add('selected');
        }
    });
}

/**
 * Navigate to the next questionaire.
 */
function nextQuestion()
{
    if (userAnswers[currentQuestion] !== undefined)
    {
        currentQuestion++;

        if (currentQuestion === quizData.length)
        {
            currentQuestion = quizData.length - 1;
        }

        showQuestion();
        showButtons();
    }
    else
    {
        alert("Please select an answer before moving to the next question.");
    }
}

/**
 * Navigate to the previous questionaire.
 */
function prevQuestion()
{
    currentQuestion--;

    if (currentQuestion < 0)
    {
        currentQuestion = 0;
    }

    showQuestion();
    showButtons();
}


/**
 * Submitting the quiz will calculate the score based
 * on the selected answers then show the results.
 */
function submitQuiz()
{
    if (userAnswers[currentQuestion] === undefined)
    {
        alert("Please select an answer before submitting the quiz.");
        return;
    }

    const score = calculateScore();
    showResults(score);
}

/**
 * Iterate through the questions and check if the given selected user answer is the same as the `correctAnswer`.
 */
function calculateScore()
{
    let score = 0;

    // Check if the selected answer is the same as the correctAnswer provided in the predefined quiz questions.
    for (let i = 0; i < quizData.length; i++)
    {
        if (userAnswers[i] === quizData[i].answers.findIndex(answer => answer === quizData[i].correctAnswer))
        {
            score++;
        }
    }

    return score;
}

/**
 * Show the results page.
 */
function showResults(score)
{
    const resultsSection = document.getElementById('results-section');
    const scoreElement = document.getElementById('score');

    const answerElements = document.querySelectorAll('.answer.selected');
    const correctAnswersList = document.getElementById('correct-answers');

    const scoreText = `Your Score: ${score} out of ${quizData.length}`;
    scoreElement.textContent = scoreText;

    correctAnswersList.innerHTML = "";

    // Show the list of selected answers.
    quizData.forEach((questionData, index) =>
    {
        const userSelectedAnswer = questionData.answers[userAnswers[index]];
        const listItem = document.createElement('li');
        listItem.innerHTML = `Q${index + 1}: ${questionData.question} <br/>Selected Answer: <b>${userSelectedAnswer}</b> <br/>Answer Key: <b>${questionData.correctAnswer}</b>`;
        correctAnswersList.appendChild(listItem);
    });

    resultsSection.style.display = 'block';
    document.getElementById('question-section').style.display = 'none';

    // Hide all buttons
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    const restartButton = document.getElementById('restart-button');

    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
    restartButton.style.display = 'inline-block'
}

/**
 * Show appropriate action buttons.
 * At the start, do not show `prevButton` and 
 * don't show `nextButton` at the end of the questionaire.
 */
function showButtons()
{
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');

    if (currentQuestion === 0)
    {
        prevButton.style.display = 'none';
    } else
    {
        prevButton.style.display = 'inline-block';
    }

    if (currentQuestion === quizData.length - 1)
    {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else
    {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

/**
 * Restart the quiz by resetting the current question index and user answers.
 */
function restartQuiz()
{
    currentQuestion = 0;
    userAnswers = [];
    showQuestion();
    showButtons();

    const resultsSection = document.getElementById('results-section');
    const questionSection = document.getElementById('question-section');
    const restartButton = document.getElementById('restart-button');

    // Hide the results and restart button section if it's visible
    resultsSection.style.display = 'none';
    restartButton.style.display = 'none';

    // Show the question section.
    questionSection.style.display = 'block';
}