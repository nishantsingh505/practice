// --- Data Generation ---

const TENSES = [
    "Simple Present", "Present Continuous", "Present Perfect", "Present Perfect Continuous",
    "Simple Past", "Past Continuous", "Past Perfect", "Past Perfect Continuous",
    "Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"
];

const TEMPLATES = [
    { text: "She [VERB] to school every day.", answer: "Simple Present", verb: "walks" },
    { text: "They [VERB] football right now.", answer: "Present Continuous", verb: "are playing" },
    { text: "I [VERB] my homework already.", answer: "Present Perfect", verb: "have finished" },
    { text: "We [VERB] to the cinema yesterday.", answer: "Simple Past", verb: "went" },
    { text: "She [VERB] a book when he called.", answer: "Past Continuous", verb: "was reading" },
    { text: "By next year, I [VERB] graduated.", answer: "Future Perfect", verb: "will have graduated" },
    { text: "He [VERB] here for ten years.", answer: "Present Perfect Continuous", verb: "has been working" },
    { text: "They [VERB] at 5 PM tomorrow.", answer: "Future Simple", verb: "will arrive" },
    { text: "I [VERB] before they arrived.", answer: "Past Perfect", verb: "had left" },
    { text: "She [VERB] to France next week.", answer: "Future (going to)", verb: "is going to travel" },
    { text: "It [VERB] heavily last night.", answer: "Simple Past", verb: "rained" },
    { text: "We [VERB] for the bus for 20 minutes.", answer: "Present Perfect Continuous", verb: "have been waiting" },
    { text: "I [VERB] my keys.", answer: "Present Perfect", verb: "have lost" },
    { text: "Look! It [VERB] again.", answer: "Present Continuous", verb: "is snowing" },
    { text: "Water [VERB] at 100 degrees Celsius.", answer: "Simple Present", verb: "boils" }
];

function generateQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];

        // Generate distractors
        const distractors = TENSES
            .filter(t => t !== template.answer)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const options = [template.answer, ...distractors].sort(() => 0.5 - Math.random());

        questions.push({
            sentence: template.text.replace("[VERB]", `<strong>${template.verb}</strong>`),
            tense: template.answer,
            options: options
        });
    }
    return questions;
}

// Generate 10 Exercises with 30 Questions each
const exercises = [];
for (let i = 1; i <= 10; i++) {
    exercises.push({
        id: i,
        title: `Exercise ${i}`,
        questions: generateQuestions(30),
        completed: false,
        bestScore: 0
    });
}

// --- App State ---
let currentExerciseIndex = -1;
let currentQuestionIndex = 0;
let score = 0;
const scorePerQuestion = 10;
let isAnswered = false;

// --- DOM Elements ---
const homeScreen = document.getElementById('home-screen');
const gameArea = document.getElementById('game-area'); // Main game wrapper
const exerciseGrid = document.getElementById('exercise-grid');

const sentenceEl = document.getElementById('sentence');
const optionsContainer = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const questionCountEl = document.getElementById('question-count');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreEl = document.getElementById('final-score');
const performanceTextEl = document.getElementById('performance-text');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');

// --- Initialization ---

function initApp() {
    renderHome();
}

function renderHome() {
    homeScreen.classList.remove('hidden');
    gameArea.classList.add('hidden');
    gameOverModal.classList.add('hidden');

    exerciseGrid.innerHTML = '';

    exercises.forEach((ex, index) => {
        const card = document.createElement('div');
        card.classList.add('exercise-card');
        if (ex.completed) card.classList.add('completed');

        const statusText = ex.completed ? `Best: ${ex.bestScore}` : 'Start';

        card.innerHTML = `
            <h3>${ex.title}</h3>
            <span class="status-badge">${statusText}</span>
        `;

        card.onclick = () => startExercise(index);
        exerciseGrid.appendChild(card);
    });
}

function startExercise(index) {
    currentExerciseIndex = index;
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = '0';

    // Shuffle current exercise questions for this attempt
    // (Optional: if we want static questions per exercise, remove sort)
    // exercises[index].questions.sort(() => Math.random() - 0.5); 

    homeScreen.classList.add('hidden');
    gameArea.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    isAnswered = false;
    nextBtn.classList.add('hidden');
    feedbackEl.textContent = '';

    const currentList = exercises[currentExerciseIndex].questions;
    const currentData = currentList[currentQuestionIndex];

    // Update Progress
    questionCountEl.textContent = `${currentQuestionIndex + 1} / ${currentList.length}`;

    // Render Sentence
    sentenceEl.innerHTML = currentData.sentence;

    // Render Options
    optionsContainer.innerHTML = '';

    currentData.options.forEach(optionText => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = optionText;
        btn.onclick = () => checkAnswer(btn, optionText, currentData.tense);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedBtn, selectedOption, correctOption) {
    if (isAnswered) return;
    isAnswered = true;

    const allButtons = optionsContainer.querySelectorAll('.option-btn');

    if (selectedOption === correctOption) {
        score += scorePerQuestion;
        scoreEl.textContent = score;
        selectedBtn.classList.add('correct');
        feedbackEl.style.color = 'var(--success)';
        feedbackEl.textContent = 'Correct!';
    } else {
        selectedBtn.classList.add('wrong');
        feedbackEl.style.color = 'var(--error)';
        feedbackEl.textContent = 'Oops! Incorrect.';

        allButtons.forEach(btn => {
            if (btn.textContent === correctOption) {
                btn.classList.add('correct');
            }
        });
    }

    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove('hidden');
}

function handleNext() {
    const currentList = exercises[currentExerciseIndex].questions;
    currentQuestionIndex++;

    if (currentQuestionIndex < currentList.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    const currentEx = exercises[currentExerciseIndex];
    currentEx.completed = true;
    if (score > currentEx.bestScore) {
        currentEx.bestScore = score;
    }

    finalScoreEl.textContent = score;
    const totalPossible = currentEx.questions.length * scorePerQuestion;
    const percentage = (score / totalPossible) * 100;

    if (percentage === 100) {
        performanceTextEl.textContent = "Perfect! You're a Grammar Master! 🏆";
    } else if (percentage >= 80) {
        performanceTextEl.textContent = "Great job! Very impressive. 🌟";
    } else if (percentage >= 50) {
        performanceTextEl.textContent = "Good effort! Keep practicing. 📚";
    } else {
        performanceTextEl.textContent = "Don't give up! Try again. 💪";
    }

    gameOverModal.classList.remove('hidden');
}

// --- Event Listeners ---
nextBtn.addEventListener('click', handleNext);

restartBtn.addEventListener('click', () => {
    // Reattempt current exercise
    startExercise(currentExerciseIndex);
});

homeBtn.addEventListener('click', () => {
    renderHome();
});

// Start App
initApp();
