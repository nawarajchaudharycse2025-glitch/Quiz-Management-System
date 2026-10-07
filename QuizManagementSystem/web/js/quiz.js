// =========================
// QUIZ QUESTIONS
// =========================

const questions = {

    programming: [

        {
            question: "Which language is primarily used for Android development?",
            options: ["Java", "HTML", "CSS", "SQL"],
            answer: 0
        },

        {
            question: "Which keyword is used to create a class in Java?",
            options: ["class", "Class", "create", "object"],
            answer: 0
        },

        {
            question: "Which data structure follows FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: 1
        },

        {
            question: "Which language is used for styling web pages?",
            options: ["HTML", "CSS", "Java", "SQL"],
            answer: 1
        },

        {
            question: "Which symbol is used for single-line comments in Java?",
            options: ["//", "##", "<!--", "**"],
            answer: 0
        }

    ],


    science: [

        {
            question: "What is the chemical formula of water?",
            options: ["CO2", "H2O", "O2", "NaCl"],
            answer: 1
        },

        {
            question: "What is the speed of light approximately?",
            options: [
                "300,000 km/s",
                "30,000 km/s",
                "3,000 km/s",
                "3 km/s"
            ],
            answer: 0
        },

        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: 1
        },

        {
            question: "What gas do humans need for respiration?",
            options: [
                "Nitrogen",
                "Oxygen",
                "Carbon dioxide",
                "Hydrogen"
            ],
            answer: 1
        },

        {
            question: "What is the center of an atom called?",
            options: [
                "Electron",
                "Nucleus",
                "Proton",
                "Shell"
            ],
            answer: 1
        }

    ],


    gk: [

        {
            question: "What is the capital of India?",
            options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
            answer: 1
        },

        {
            question: "Which is the largest ocean?",
            options: [
                "Atlantic Ocean",
                "Indian Ocean",
                "Pacific Ocean",
                "Arctic Ocean"
            ],
            answer: 2
        },

        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            answer: 2
        },

        {
            question: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Japan", "India", "Korea"],
            answer: 1
        },

        {
            question: "Which is the largest planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: 2
        }

    ]

};


// =========================
// GET CATEGORY
// =========================

const category =
    localStorage.getItem("selectedCategory") || "programming";

const quizQuestions =
    questions[category] || questions.programming;


// =========================
// QUIZ VARIABLES
// =========================

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let timeLeft = 60;

let quizFinished = false;


// =========================
// HTML ELEMENTS
// =========================

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const nextButton =
    document.getElementById("nextButton");

const timerElement =
    document.getElementById("timer");

const numberElement =
    document.getElementById("questionNumber");

const progressBar =
    document.getElementById("progressBar");


// =========================
// TIMER
// =========================

const timer = setInterval(function () {

    // If quiz has already finished,
    // stop the timer immediately.

    if (quizFinished) {

        clearInterval(timer);

        return;
    }


    timeLeft--;

    timerElement.textContent = timeLeft;


    // Time is over

    if (timeLeft <= 0) {

        timeLeft = 0;

        timerElement.textContent = "0";

        clearInterval(timer);

        finishQuiz();

    }

}, 1000);


// =========================
// LOAD QUESTION
// =========================

function loadQuestion() {

    const q =
        quizQuestions[currentQuestion];

    selectedAnswer = null;


    questionElement.textContent =
        q.question;


    numberElement.textContent =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;


    progressBar.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;


    optionsElement.innerHTML = "";


    q.options.forEach(function (option, index) {

        const div =
            document.createElement("div");


        div.className = "option";


        div.textContent = option;


        div.onclick = function () {

            if (quizFinished) {
                return;
            }


            document
                .querySelectorAll(".option")
                .forEach(function (el) {

                    el.classList.remove("selected");

                });


            div.classList.add("selected");


            selectedAnswer = index;

        };


        optionsElement.appendChild(div);

    });

}


// =========================
// NEXT QUESTION
// =========================

nextButton.addEventListener(
    "click",
    function () {

        // Do nothing if quiz is finished

        if (quizFinished) {
            return;
        }


        // Make sure an answer is selected

        if (selectedAnswer === null) {

            alert("Please select an answer.");

            return;
        }


        // Check answer

        if (
            selectedAnswer ===
            quizQuestions[currentQuestion].answer
        ) {

            score++;

        }


        // Move to next question

        currentQuestion++;


        // =========================
        // QUIZ COMPLETED
        // =========================

        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            // IMPORTANT:
            // Finish immediately.
            // Do NOT wait for timer.

            finishQuiz();

            return;
        }


        // Load next question

        loadQuestion();

    }
);


// =========================
// FINISH QUIZ
// =========================

function finishQuiz() {

    // Prevent finishQuiz() from
    // running more than once.

    if (quizFinished) {
        return;
    }


    // Mark quiz as finished immediately

    quizFinished = true;


    // STOP TIMER IMMEDIATELY

    clearInterval(timer);


    // Disable next button

    nextButton.disabled = true;


    // Calculate percentage

    const percentage =
        Math.round(
            (score / quizQuestions.length) * 100
        );


    // =========================
    // SAVE LAST RESULT
    // =========================

    localStorage.setItem(
        "lastScore",
        percentage
    );


    localStorage.setItem(
        "quizScore",
        score
    );


    localStorage.setItem(
        "quizTotal",
        quizQuestions.length
    );


    // =========================
    // UPDATE BEST SCORE
    // =========================

    const oldBest =
        Number(
            localStorage.getItem("bestScore") || 0
        );


    if (percentage > oldBest) {

        localStorage.setItem(
            "bestScore",
            percentage
        );

    }


    // =========================
    // UPDATE QUIZ COUNT
    // =========================

    const oldCount =
        Number(
            localStorage.getItem("quizCount") || 0
        );


    const newCount =
        oldCount + 1;


    localStorage.setItem(
        "quizCount",
        newCount
    );


    // =========================
    // UPDATE ACCURACY
    // =========================

    const oldAccuracy =
        Number(
            localStorage.getItem("accuracy") || 0
        );


    const newAccuracy =
        Math.round(
            (
                (oldAccuracy * oldCount) +
                percentage
            ) / newCount
        );


    localStorage.setItem(
        "accuracy",
        newAccuracy
    );


    // =========================
    // GO TO RESULT PAGE
    // =========================

    window.location.href =
        "result.html";

}


// =========================
// START QUIZ
// =========================

loadQuestion();