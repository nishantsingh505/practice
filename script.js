// --- Data Generation ---

const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
const NAMES = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];
const PRONOUNS = ["I", "You", "He", "She", "We", "They", "The students", "The teacher", "My friend", "The team"];

// Verbs with forms: [base, past, pastParticiple, presentParticiple, 3rdPersonSingular]
const VERBS = [
    { base: "walk", past: "walked", pp: "walked", ing: "walking", s: "walks" },
    { base: "play", past: "played", pp: "played", ing: "playing", s: "plays" },
    { base: "work", past: "worked", pp: "worked", ing: "working", s: "works" },
    { base: "study", past: "studied", pp: "studied", ing: "studying", s: "studies" },
    { base: "eat", past: "ate", pp: "eaten", ing: "eating", s: "eats" },
    { base: "go", past: "went", pp: "gone", ing: "going", s: "goes" },
    { base: "write", past: "wrote", pp: "written", ing: "writing", s: "writes" },
    { base: "read", past: "read", pp: "read", ing: "reading", s: "reads" },
    { base: "run", past: "ran", pp: "run", ing: "running", s: "runs" },
    { base: "speak", past: "spoke", pp: "spoken", ing: "speaking", s: "speaks" },
    { base: "drive", past: "drove", pp: "driven", ing: "driving", s: "drives" },
    { base: "fly", past: "flew", pp: "flown", ing: "flying", s: "flies" },
    { base: "swim", past: "swam", pp: "swum", ing: "swimming", s: "swims" },
    { base: "sing", past: "sang", pp: "sung", ing: "singing", s: "sings" },
    { base: "sleep", past: "slept", pp: "slept", ing: "sleeping", s: "sleeps" },
    { base: "cook", past: "cooked", pp: "cooked", ing: "cooking", s: "cooks" },
    { base: "clean", past: "cleaned", pp: "cleaned", ing: "cleaning", s: "cleans" },
    { base: "paint", past: "painted", pp: "painted", ing: "painting", s: "paints" },
    { base: "wait", past: "waited", pp: "waited", ing: "waiting", s: "waits" },
    { base: "teach", past: "taught", pp: "taught", ing: "teaching", s: "teaches" },
    { base: "learn", past: "learned", pp: "learned", ing: "learning", s: "learns" },
    { base: "watch", past: "watched", pp: "watched", ing: "watching", s: "watches" },
    { base: "listen", past: "listened", pp: "listened", ing: "listening", s: "listens" },
    { base: "buy", past: "bought", pp: "bought", ing: "buying", s: "buys" },
    { base: "sell", past: "sold", pp: "sold", ing: "selling", s: "sells" }
];

const TENSES = [
    "Simple Present", "Present Continuous", "Present Perfect", "Present Perfect Continuous",
    "Simple Past", "Past Continuous", "Past Perfect", "Past Perfect Continuous",
    "Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function constructSentence(sub, verb, tense) {
    const isPlural = ["We", "They", "The students", "The team"].includes(sub) || sub === "You"; // treating You as plural context usually
    const isFirstPerson = sub === "I";
    const isThirdPerson = !isPlural && !isFirstPerson;

    let vPhrase = "";

    switch (tense) {
        case "Simple Present":
            vPhrase = (isThirdPerson) ? verb.s : verb.base;
            break;
        case "Present Continuous":
            const be = isFirstPerson ? "am" : (isPlural ? "are" : "is");
            vPhrase = `${be} ${verb.ing}`;
            break;
        case "Present Perfect":
            const have = isThirdPerson ? "has" : "have";
            vPhrase = `${have} ${verb.pp}`;
            break;
        case "Present Perfect Continuous":
            const haveBeen = isThirdPerson ? "has been" : "have been";
            vPhrase = `${haveBeen} ${verb.ing}`;
            break;
        case "Simple Past":
            vPhrase = verb.past;
            break;
        case "Past Continuous":
            const was = isPlural || sub === "You" ? "were" : "was"; // 'You' uses were
            vPhrase = `${was} ${verb.ing}`;
            break;
        case "Past Perfect":
            vPhrase = `had ${verb.pp}`;
            break;
        case "Past Perfect Continuous":
            vPhrase = `had been ${verb.ing}`;
            break;
        case "Future Simple":
            vPhrase = `will ${verb.base}`;
            break;
        case "Future Continuous":
            vPhrase = `will be ${verb.ing}`;
            break;
        case "Future Perfect":
            vPhrase = `will have ${verb.pp}`;
            break;
        case "Future Perfect Continuous":
            vPhrase = `will have been ${verb.ing}`;
            break;
    }

    // Contexts to make sentences natural
    const contexts = [
        "every day", "right now", "already", "yesterday", "when he called", "by next year",
        "for ten years", "tomorrow", "before they arrived", "next week", "last night",
        "since morning", "at this moment", "recently", "in 2020", "at 5 PM"
    ];

    // Simple logic to pick a somewhat logical context (not strict grammar checking here, focusing on form identification)
    const context = getRandomItem(contexts);

    return {
        sentence: `${sub} <strong>${vPhrase}</strong> ${context}.`, // Bold the verb phrase
        tense: tense,
        text: `${sub} ${vPhrase} ${context}.` // Plain text for uniqueness
    };
}

function generateUniqueQuestions(totalNeeded) {
    const generatedSet = new Set();
    const questions = [];

    // We try to generate until we have enough
    let safetyCounter = 0;

    while (questions.length < totalNeeded && safetyCounter < 10000) {
        safetyCounter++;

        const sub = getRandomItem(PRONOUNS);
        const verb = getRandomItem(VERBS);
        // Balance tenses: cycle through them or random
        const tense = TENSES[questions.length % TENSES.length]; // cycling ensures even distribution

        const result = constructSentence(sub, verb, tense);

        if (!generatedSet.has(result.text)) {
            generatedSet.add(result.text);

            // Generate options
            const distractors = TENSES
                .filter(t => t !== tense)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            const options = [tense, ...distractors].sort(() => 0.5 - Math.random());

            questions.push({
                sentence: result.sentence, // HTML
                tense: tense,
                options: options
            });
        }
    }

    // Shuffle the entire master list so exercises aren't just cycled tenses
    return questions.sort(() => Math.random() - 0.5);
}

// Generate 300 unique questions total for 10 exercises
const MASTER_QUESTION_LIST = generateUniqueQuestions(300);

// Distribute to exercises
const exercises = [];
for (let i = 0; i < 10; i++) {
    exercises.push({
        id: i + 1,
        title: `Exercise ${i + 1}`,
        questions: MASTER_QUESTION_LIST.slice(i * 30, (i + 1) * 30),
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
