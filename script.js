// --- Data Generation ---

const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
const NAMES = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];
const PRONOUNS = ["I", "You", "He", "She", "We", "They", "The students", "The teacher", "My friend", "The team", "My parents", "The dog", "Everyone", "Nobody", "The doctor", "Our neighbors", "The cat", "The birds"];

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
    { base: "sell", past: "sold", pp: "sold", ing: "selling", s: "sells" },
    // New Verbs
    { base: "drink", past: "drank", pp: "drunk", ing: "drinking", s: "drinks" },
    { base: "break", past: "broke", pp: "broken", ing: "breaking", s: "breaks" },
    { base: "meet", past: "met", pp: "met", ing: "meeting", s: "meets" },
    { base: "win", past: "won", pp: "won", ing: "winning", s: "wins" },
    { base: "build", past: "built", pp: "built", ing: "building", s: "builds" },
    { base: "choose", past: "chose", pp: "chosen", ing: "choosing", s: "chooses" },
    { base: "draw", past: "drew", pp: "drawn", ing: "drawing", s: "draws" },
    { base: "grow", past: "grew", pp: "grown", ing: "growing", s: "grows" },
    { base: "know", past: "knew", pp: "known", ing: "knowing", s: "knows" },
    { base: "leave", past: "left", pp: "left", ing: "leaving", s: "leaves" },
    { base: "pay", past: "paid", pp: "paid", ing: "paying", s: "pays" },
    { base: "say", past: "said", pp: "said", ing: "saying", s: "says" },
    { base: "see", past: "saw", pp: "seen", ing: "seeing", s: "sees" },
    { base: "send", past: "sent", pp: "sent", ing: "sending", s: "sends" },
    { base: "sit", past: "sat", pp: "sat", ing: "sitting", s: "sits" },
    { base: "stand", past: "stood", pp: "stood", ing: "standing", s: "stands" },
    { base: "take", past: "took", pp: "taken", ing: "taking", s: "takes" },
    { base: "tell", past: "told", pp: "told", ing: "telling", s: "tells" },
    { base: "think", past: "thought", pp: "thought", ing: "thinking", s: "thinks" },
    { base: "wear", past: "wore", pp: "worn", ing: "wearing", s: "wears" },
    { base: "begin", past: "began", pp: "begun", ing: "beginning", s: "begins" },
    { base: "bring", past: "brought", pp: "brought", ing: "bringing", s: "brings" },
    { base: "catch", past: "caught", pp: "caught", ing: "catching", s: "catches" },
    { base: "come", past: "came", pp: "come", ing: "coming", s: "comes" },
    { base: "do", past: "did", pp: "done", ing: "doing", s: "does" },
    { base: "fall", past: "fell", pp: "fallen", ing: "falling", s: "falls" },
    { base: "find", past: "found", pp: "found", ing: "finding", s: "finds" },
    { base: "forget", past: "forgot", pp: "forgotten", ing: "forgetting", s: "forgets" },
    { base: "give", past: "gave", pp: "given", ing: "giving", s: "gives" },
    { base: "make", past: "made", pp: "made", ing: "making", s: "makes" }
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
    const isPlural = ["We", "They", "The students", "The team", "My parents", "Our neighbors", "The birds", "Some people"].includes(sub) || sub === "You";
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
            const was = isPlural || sub === "You" ? "were" : "was";
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

    const contexts = [
        "every day", "right now", "already", "yesterday", "when he called", "by next year",
        "for ten years", "tomorrow", "before they arrived", "next week", "last night",
        "since morning", "at this moment", "recently", "in 2020", "at 5 PM",
        "usually", "sometimes", "rarely", "on Mondays", "in the evening",
        "during the holiday", "after school", "before breakfast", "since 1990",
        "for a long time", "until midnight", "in the future", "later today",
        "a few minutes ago", "last Christmas", "next month", "every weekend",
        "twice a week", "soon"
    ];

    const context = getRandomItem(contexts);

    return {
        sentence: `${sub} <strong>${vPhrase}</strong> ${context}.`,
        tense: tense,
        text: `${sub} ${vPhrase} ${context}.`,
        vPhrase: vPhrase,
        rawSentence: `${sub} %BLANK% ${context}.`
    };
}

function generateUniqueQuestions(totalNeeded) {
    const generatedSet = new Set();
    const questions = [];
    let safetyCounter = 0;

    while (questions.length < totalNeeded && safetyCounter < 10000) {
        safetyCounter++;

        let sub;
        if (Math.random() < 0.25) {
            sub = `${getRandomItem(TITLES)} ${getRandomItem(NAMES)}`;
        } else {
            sub = getRandomItem(PRONOUNS);
        }

        const verb = getRandomItem(VERBS);
        const tense = TENSES[questions.length % TENSES.length];

        const result = constructSentence(sub, verb, tense);

        if (!generatedSet.has(result.text)) {
            generatedSet.add(result.text);
            const distractors = TENSES
                .filter(t => t !== tense)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            const options = [tense, ...distractors].sort(() => 0.5 - Math.random());

            questions.push({
                sentence: result.sentence,
                tense: tense,
                options: options
            });
        }
    }
    return questions.sort(() => Math.random() - 0.5);
}

const MASTER_IDENTIFY_LIST = generateUniqueQuestions(50);

function generateFillBlanksQuestions(totalNeeded) {
    const questions = [];
    const generatedSet = new Set();
    let safetyCounter = 0;

    while (questions.length < totalNeeded && safetyCounter < 10000) {
        safetyCounter++;
        let sub;
        if (Math.random() < 0.25) {
            sub = `${getRandomItem(TITLES)} ${getRandomItem(NAMES)}`;
        } else {
            sub = getRandomItem(PRONOUNS);
        }
        const verb = getRandomItem(VERBS);
        const tense = TENSES[questions.length % TENSES.length]; // Rotation ensures even spread

        const result = constructSentence(sub, verb, tense);
        const uniqueKey = `${result.text}-FILL`;

        if (!generatedSet.has(uniqueKey)) {
            generatedSet.add(uniqueKey);

            // Create distractors (same verb, different tenses)
            const distractorTenses = TENSES
                .filter(t => t !== tense)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            const options = [result.vPhrase];
            distractorTenses.forEach(dt => {
                options.push(constructSentence(sub, verb, dt).vPhrase);
            });

            questions.push({
                sentence: result.rawSentence.replace('%BLANK%', '_______'),
                correctAnswer: result.vPhrase,
                options: options.sort(() => 0.5 - Math.random()),
                instruction: `Fill in the blank (${tense})`,
                type: 'fill'
            });
        }
    }
    return questions.sort(() => Math.random() - 0.5);
}

const MASTER_FILL_LIST = generateFillBlanksQuestions(50);

const identifyExercises = [];
for (let i = 0; i < 5; i++) {
    identifyExercises.push({
        id: `id-${i + 1}`,
        title: `Exercise ${i + 1}`,
        questions: MASTER_IDENTIFY_LIST.slice(i * 10, (i + 1) * 10).map(q => ({
            ...q,
            correctAnswer: q.tense, // Standardize correctness check
            instruction: 'Identify the Tense',
            type: 'identify'
        })),
        completed: false,
        bestScore: 0
    });
}

const fillExercises = [];
for (let i = 0; i < 5; i++) {
    fillExercises.push({
        id: `fill-${i + 1}`,
        title: `Fill Blanks ${i + 1}`,
        questions: MASTER_FILL_LIST.slice(i * 10, (i + 1) * 10),
        completed: false,
        bestScore: 0
    });
}

// --- App State ---
let currentMode = 'identify'; // 'identify' or 'fill'
let currentExerciseList = identifyExercises;
let currentExerciseIndex = -1;
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
const baseScore = 10;
let isAnswered = false;
let audioCtx = null;

// --- DOM Elements ---
const homeScreen = document.getElementById('home-screen');
const gameArea = document.getElementById('game-area');
const exerciseGrid = document.getElementById('exercise-grid');

const sentenceEl = document.getElementById('sentence');
const optionsContainer = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const streakContainer = document.getElementById('streak-container');
const streakCountEl = document.getElementById('streak-count');
const questionCountEl = document.getElementById('question-count');
const progressContainer = document.getElementById('progress-container');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreEl = document.getElementById('final-score');
const performanceTextEl = document.getElementById('performance-text');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const exerciseSelector = document.getElementById('exercise-selector');

// --- Audio System ---
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'correct') {
        // High ping
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'wrong') {
        // Low buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'win') {
        // Major chord arpeggio
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.connect(g);
            g.connect(audioCtx.destination);
            o.frequency.value = freq;
            const start = now + i * 0.1;
            g.gain.setValueAtTime(0.2, start);
            g.gain.exponentialRampToValueAtTime(0.01, start + 0.5);
            o.start(start);
            o.stop(start + 0.5);
        });
    }
}

// --- Visual Effects ---
function createParticles(x, y) {
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;

        // Random destination
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

function showFloatingScore(amount, x, y) {
    const el = document.createElement('div');
    el.classList.add('floating-text');
    el.textContent = `+${amount} XP`;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

function updateExerciseSelector() {
    exerciseSelector.innerHTML = '';
    currentExerciseList.forEach((ex, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = ex.title;
        if (index === currentExerciseIndex) option.selected = true;
        exerciseSelector.appendChild(option);
    });
}

// --- App Logic ---

function initApp() {
    // Inject progress bar element
    progressContainer.innerHTML = `
        <div class="progress-fill" id="progress-fill"></div>
        <span id="question-count">1 / 30</span>
    `;
    renderHome();

    // Tab Listeners
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMode = btn.dataset.mode;
            currentExerciseList = currentMode === 'identify' ? identifyExercises : fillExercises;
            renderHome();
        });
    });

    // Init Audio on first interaction
    document.body.addEventListener('click', initAudio, { once: true });
}

function renderHome() {
    homeScreen.classList.remove('hidden');
    gameArea.classList.add('hidden');
    gameOverModal.classList.add('hidden');

    exerciseGrid.innerHTML = '';

    currentExerciseList.forEach((ex, index) => {
        const card = document.createElement('div');
        card.classList.add('exercise-card');
        if (ex.completed) card.classList.add('completed');

        const statusText = ex.completed ? `Best: ${ex.bestScore} XP` : 'Start';

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
    streak = 0;
    streakContainer.classList.add('hidden');
    scoreEl.textContent = '0';

    updateExerciseSelector(); // Update dropdown

    homeScreen.classList.add('hidden');
    gameArea.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    isAnswered = false;
    nextBtn.classList.add('hidden');
    feedbackEl.textContent = '';

    const currentList = currentExerciseList[currentExerciseIndex].questions;
    const currentData = currentList[currentQuestionIndex];

    // Update Progress
    const progressPercent = ((currentQuestionIndex) / currentList.length) * 100;
    document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    document.getElementById('question-count').textContent = `${currentQuestionIndex + 1} / ${currentList.length}`;

    sentenceEl.innerHTML = currentData.sentence;
    document.querySelector('.instruction-text').textContent = currentData.instruction;
    optionsContainer.innerHTML = '';

    currentData.options.forEach(optionText => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = optionText;
        btn.onclick = (e) => checkAnswer(btn, optionText, currentData.correctAnswer, e);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedBtn, selectedOption, correctOption, event) {
    if (isAnswered) return;
    isAnswered = true;

    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    const rect = selectedBtn.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    const midY = rect.top + rect.height / 2;

    if (selectedOption === correctOption) {
        // Correct
        streak++;
        playSound('correct');
        createParticles(midX, midY);

        // Multiplier Logic
        let multiplier = 1;
        if (streak >= 3) multiplier = 1.2;
        if (streak >= 5) multiplier = 1.5;
        if (streak >= 10) multiplier = 2;

        const points = Math.ceil(baseScore * multiplier);
        score += points;
        scoreEl.textContent = score;

        showFloatingScore(points, midX, midY - 50);

        selectedBtn.classList.add('correct');
        feedbackEl.style.color = 'var(--success)';
        feedbackEl.textContent = 'Correct!';

    } else {
        // Wrong
        streak = 0;
        playSound('wrong');
        selectedBtn.classList.add('wrong');
        feedbackEl.style.color = 'var(--error)';
        feedbackEl.textContent = 'Oops! Incorrect.';

        allButtons.forEach(btn => {
            if (btn.textContent === correctOption) {
                btn.classList.add('correct');
            }
        });
    }

    // Update Streak UI
    if (streak > 0) {
        streakContainer.classList.remove('hidden');
        streakCountEl.textContent = streak;
        streakCountEl.parentElement.classList.add('streak-active');
    } else {
        streakContainer.classList.add('hidden');
        streakCountEl.parentElement.classList.remove('streak-active');
    }

    allButtons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove('hidden');
}

function handleNext() {
    const currentList = currentExerciseList[currentExerciseIndex].questions;
    currentQuestionIndex++;

    if (currentQuestionIndex < currentList.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    const currentEx = currentExerciseList[currentExerciseIndex];
    currentEx.completed = true;
    if (score > currentEx.bestScore) {
        currentEx.bestScore = score;
    }

    finalScoreEl.textContent = score;
    playSound('win');

    // Calculate stars roughly
    const percentage = (score / (currentEx.questions.length * baseScore * 1.5)) * 100; // Adjusted for multiplier

    if (percentage >= 80) {
        performanceTextEl.textContent = "Legendary! 🏆 You are a Grammar God!";
    } else if (percentage >= 60) {
        performanceTextEl.textContent = "Awesome! 🌟 Great streak!";
    } else {
        performanceTextEl.textContent = "Good practice! 💪 Keep it up.";
    }

    gameOverModal.classList.remove('hidden');
}

// --- Event Listeners ---
nextBtn.addEventListener('click', handleNext);

restartBtn.addEventListener('click', () => {
    startExercise(currentExerciseIndex);
});

homeBtn.addEventListener('click', () => {
    renderHome();
});

exerciseSelector.addEventListener('change', (e) => {
    startExercise(parseInt(e.target.value));
});

// Start App
initApp();
