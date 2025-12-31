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

// --- Voice Mode Data ---

const TRANSITIVE_VERBS = [
    { base: "eat", past: "ate", pp: "eaten", s: "eats", ing: "eating", objects: ["the apple", "lunch", "the cake", "pizza"] },
    { base: "write", past: "wrote", pp: "written", s: "writes", ing: "writing", objects: ["a letter", "the report", "a book", "an email"] },
    { base: "paint", past: "painted", pp: "painted", s: "paints", ing: "painting", objects: ["a portrait", "the wall", "a masterpiece", "the fence"] },
    { base: "fix", past: "fixed", pp: "fixed", s: "fixes", ing: "fixing", objects: ["the car", "the computer", "the leak", "the bike"] },
    { base: "clean", past: "cleaned", pp: "cleaned", s: "cleans", ing: "cleaning", objects: ["the room", "the house", "the windows", "the floor"] },
    { base: "read", past: "read", pp: "read", s: "reads", ing: "reading", objects: ["the news", "a novel", "the instructions", "the signs"] },
    { base: "call", past: "called", pp: "called", s: "calls", ing: "calling", objects: ["the doctor", "the police", "my mom", "the client"] },
    { base: "watch", past: "watched", pp: "watched", s: "watches", ing: "watching", objects: ["a movie", "the show", "the birds", "the game"] },
    { base: "build", past: "built", pp: "built", s: "builds", ing: "building", objects: ["a house", "a bridge", "a sandcastle", "a robot"] },
    { base: "love", past: "loved", pp: "loved", s: "loves", ing: "loving", objects: ["the cat", "music", "pizza", "summer"] },
    { base: "help", past: "helped", pp: "helped", s: "helps", ing: "helping", objects: ["the old lady", "the student", "the team", "me"] },
    { base: "visit", past: "visited", pp: "visited", s: "visits", ing: "visiting", objects: ["Grandma", "Paris", "the museum", "the doctor"] }
];

function constructVoiceSentence(sub, verb, obj, tense, isPassive) {
    const isPluralSub = ["We", "They", "The students", "The team", "My parents", "Our neighbors", "The birds", "Some people"].includes(sub) || sub === "You";
    // For passive, the 'Subject' of the sentence is actually the 'Object' of the action.
    // So we need to check if the new subject (the original object) is singular or plural.
    // Simplifying: Most objects here are singular (the apple, a letter).
    // Let's assume singular for generated objects unless specified.
    const isPluralObj = false; // "the apple" is singular.

    let vPhrase = "";

    // Active Construction
    if (!isPassive) {
        switch (tense) {
            case "Simple Present": vPhrase = (!isPluralSub && sub !== "I") ? verb.s : verb.base; break;
            case "Simple Past": vPhrase = verb.past; break;
            case "Future Simple": vPhrase = `will ${verb.base}`; break;
            case "Present Perfect": vPhrase = `${(!isPluralSub && sub !== "I") ? "has" : "have"} ${verb.pp}`; break;
        }
        return `${sub} ${vPhrase} ${obj}.`;
    }

    // Passive Construction
    else {
        // Obj becomes the subject. 'obj' strings like "the apple" are already lowercase except generally not proper nouns in this set.
        // Capitalize first letter of new subject.
        let newSub = obj.charAt(0).toUpperCase() + obj.slice(1);

        let be = "";
        switch (tense) {
            case "Simple Present": be = "is"; break; // Assuming singular obj
            case "Simple Past": be = "was"; break; // Assuming singular obj
            case "Future Simple": be = "will be"; break;
            case "Present Perfect": be = "has been"; break;
        }

        let agent = sub;
        if (["I", "We", "They", "He", "She"].includes(sub)) {
            const map = { "I": "me", "We": "us", "They": "them", "He": "him", "She": "her" };
            agent = map[sub];
        } else if (sub === "You") {
            agent = "you";
        } else {
            // Check if it's a generated Name (starts with Title)
            const startsWithTitle = TITLES.some(t => sub.startsWith(t));
            if (!startsWithTitle) {
                // Lowercase the first letter for common nouns like "The dog" -> "the dog"
                agent = sub.charAt(0).toLowerCase() + sub.slice(1);
            }
        }

        return `${newSub} ${be} ${verb.pp} by ${agent}.`;
    }
}

function generateVoiceQuestions(totalNeeded) {
    const questions = [];
    const used = new Set();
    let safety = 0;

    while (questions.length < totalNeeded && safety < 5000) {
        safety++;
        let sub = Math.random() < 0.3 ? `${getRandomItem(TITLES)} ${getRandomItem(NAMES)}` : getRandomItem(PRONOUNS);
        const verb = getRandomItem(TRANSITIVE_VERBS);
        const obj = getRandomItem(verb.objects);
        const tense = getRandomItem(["Simple Present", "Simple Past", "Future Simple", "Present Perfect"]);
        const isPassive = Math.random() < 0.5;

        const sentence = constructVoiceSentence(sub, verb, obj, tense, isPassive);

        if (!used.has(sentence)) {
            used.add(sentence);

            // Type 1: Identify Active vs Passive
            if (Math.random() < 0.6) {
                questions.push({
                    sentence: sentence,
                    correctAnswer: isPassive ? "Passive Voice" : "Active Voice",
                    options: ["Active Voice", "Passive Voice"],
                    instruction: "Identify the Voice (Active or Passive?)",
                    type: "voice_id"
                });
            } else {
                // Type 2: Convert
                // If currently active, options are correct Passive + wrong Passives
                const correct = isPassive ? constructVoiceSentence(sub, verb, obj, tense, false) : constructVoiceSentence(sub, verb, obj, tense, true);
                const wrongTense = tense === "Simple Past" ? "Future Simple" : "Simple Past"; // Simple distractor logic
                const wrong1 = isPassive ? constructVoiceSentence(sub, verb, obj, wrongTense, false) : constructVoiceSentence(sub, verb, obj, wrongTense, true);

                questions.push({
                    sentence: `Convert to ${isPassive ? 'Active' : 'Passive'}:<br>"${sentence}"`,
                    correctAnswer: correct,
                    options: [correct, wrong1].sort(() => 0.5 - Math.random()),
                    instruction: `Convert to ${isPassive ? 'Active' : 'Passive'}`,
                    type: "voice_convert"
                });
            }
        }
    }
    return questions;
}

const MASTER_VOICE_LIST = generateVoiceQuestions(100);
const voiceExercises = [];
for (let i = 0; i < 10; i++) {
    voiceExercises.push({
        id: `voice-${i + 1}`,
        title: `Voice Challenge ${i + 1}`,
        questions: MASTER_VOICE_LIST.slice(i * 10, (i + 1) * 10),
        completed: false,
        bestScore: 0
    });
}

// --- Translation Mode Data ---

const TRANSLATION_PAIRS = [
    { hi: "मैं बाजार जा रहा हूँ।", en: "I am going to the market." },
    { hi: "वह एक किताब पढ़ रही है।", en: "She is reading a book." },
    { hi: "हम कल मिलेंगे।", en: "We will meet tomorrow." },
    { hi: "उसने अपना गृहकार्य पूरा कर लिया है।", en: "He has finished his homework." },
    { hi: "वे पार्क में खेल रहे हैं।", en: "They are playing in the park." },
    { hi: "सूरज पूर्व से उगता है।", en: "The sun rises in the east." },
    { hi: "मुझे चाय पसंद है।", en: "I like tea." },
    { hi: "आज ट्रेन देर से है।", en: "The train is late today." },
    { hi: "खिड़की खोलो।", en: "Open the window." },
    { hi: "कृपया दरवाजा बंद करो।", en: "Please close the door." },
    { hi: "वह अंग्रेज़ी बोल सकती है।", en: "She can speak English." },
    { hi: "मुझे यह समझ नहीं आता।", en: "I don't understand this." },
    { hi: "वह मुझसे लंबा है।", en: "He is taller than me." },
    { hi: "हम एक घंटे से इंतज़ार कर रहे हैं।", en: "We have been waiting for an hour." },
    { hi: "खाना स्वादिष्ट था।", en: "The food was delicious." },
    { hi: "सबसे नज़दीकी अस्पताल कहाँ है?", en: "Where is the nearest hospital?" },
    { hi: "मैं तुम्हें बाद में फोन करूंगा।", en: "I will call you later." },
    { hi: "वह कल स्कूल गई थी।", en: "She went to school yesterday." },
    { hi: "क्या आपको थोड़ा पानी चाहिए?", en: "Do you want some water?" },
    { hi: "बच्चा सो रहा है।", en: "The baby is sleeping." },
    { hi: "तेज़ बारिश हो रही है।", en: "It is raining heavily." },
    { hi: "उसका जन्म दिल्ली में हुआ था।", en: "He was born in Delhi." },
    { hi: "मैंने अपनी चाबियाँ खो दी हैं।", en: "I have lost my keys." },
    { hi: "कृपया मेरी मदद करें।", en: "Please help me." },
    { hi: "हम हिंदी सीख रहे हैं।", en: "We are learning Hindi." },
    { hi: "फिल्म सात बजे शुरू होती है।", en: "The movie starts at seven." },
    { hi: "वह रात का खाना बना रही है।", en: "She is cooking dinner." },
    { hi: "यह सड़क बहुत व्यस्त है।", en: "This road is very busy." },
    { hi: "मुझे नया फोन खरीदना है।", en: "I need to buy a new phone." },
    { hi: "उसे तीखा खाना पसंद नहीं है।", en: "He doesn't like spicy food." },
    { hi: "मेरा भाई मुंबई में रहता है।", en: "My brother lives in Mumbai." },
    { hi: "क्या आप वह फिर से कह सकते हैं?", en: "Can you repeat that?" },
    { hi: "कक्षा शुरू हो चुकी है।", en: "The class has started." },
    { hi: "मुझे ठंड लग रही है।", en: "I am feeling cold." },
    { hi: "उसकी आवाज़ बहुत सुंदर है।", en: "She has a beautiful voice." },
    { hi: "हमें समय पर होना चाहिए।", en: "We must be on time." },
    { hi: "कंप्यूटर में समस्या है।", en: "There is a problem with the computer." },
    { hi: "वह नौकरी ढूंढ रहा है।", en: "He is looking for a job." },
    { hi: "आज दुकान बंद है।", en: "The shop is closed today." },
    { hi: "मैं आपका नाम भूल गया।", en: "I forgot your name." },
    { hi: "कृपया यहाँ बैठिए।", en: "Please sit here." },
    { hi: "बच्चा कुत्ते से डरता है।", en: "The child is afraid of the dog." },
    { hi: "हमारे पास पर्याप्त समय है।", en: "We have enough time." },
    { hi: "आज मौसम अच्छा है।", en: "The weather is nice today." },
    { hi: "वह कॉफी पी रहा है।", en: "He is drinking coffee." },
    { hi: "वह जल्द ही पहुंचेगी।", en: "She will arrive soon." },
    { hi: "मैं तैर सकता हूँ।", en: "I can swim." },
    { hi: "कृपया अपना नाम लिखें।", en: "Please write your name." },
    { hi: "बस में भीड़ है।", en: "The bus is crowded." },
    { hi: "मैं आज थका हुआ हूँ।", en: "I am tired today." },
    { hi: "क्या तुमने खाना खा लिया?", en: "Have you eaten?" },
    { hi: "वह अभी ऑफिस में है।", en: "He is at the office right now." },
    { hi: "मुझे संगीत सुनना पसंद है।", en: "I like listening to music." },
    { hi: "हमने टिकट पहले ही खरीद लिए हैं।", en: "We have already bought the tickets." },
    { hi: "वह बस का इंतज़ार कर रही है।", en: "She is waiting for the bus." },
    { hi: "कृपया लाइट बंद कर दें।", en: "Please turn off the light." },
    { hi: "यह मेरी पहली यात्रा है।", en: "This is my first trip." },
    { hi: "क्या आप मेरी बात सुन रहे हैं?", en: "Are you listening to me?" },
    { hi: "ट्रेन प्लेटफॉर्म नंबर तीन पर आएगी।", en: "The train will arrive at platform three." },
    { hi: "मुझे सिरदर्द हो रहा है।", en: "I have a headache." },
    { hi: "वह रोज़ सुबह दौड़ता है।", en: "He runs every morning." },
    { hi: "बच्चे स्कूल से लौट रहे हैं।", en: "The children are returning from school." },
    { hi: "क्या मैं आपकी मदद कर सकता हूँ?", en: "Can I help you?" },
    { hi: "हमें होटल की बुकिंग करनी है।", en: "We need to book the hotel." },
    { hi: "उसने अपनी गलती स्वीकार की।", en: "She admitted her mistake." },
    { hi: "कमरे में बहुत अंधेरा है।", en: "The room is very dark." },
    { hi: "मुझे यह रंग पसंद नहीं है।", en: "I don't like this color." },
    { hi: "वह गणित में अच्छा है।", en: "He is good at math." },
    { hi: "हमने रास्ता बदल दिया।", en: "We changed the route." },
    { hi: "आज मेरी छुट्टी है।", en: "Today is my day off." },
    { hi: "कृपया धीरे बोलिए।", en: "Please speak slowly." },
    { hi: "मुझे भूख लगी है।", en: "I am hungry." },
    { hi: "वह फोटो खींच रहा है।", en: "He is taking a photo." },
    { hi: "क्या आप चाय या कॉफी चाहेंगे?", en: "Would you like tea or coffee?" },
    { hi: "मैंने कल नई फिल्म देखी।", en: "I watched a new movie yesterday." },
    { hi: "दुकान नौ बजे खुलती है।", en: "The shop opens at nine." },
    { hi: "हमें नए नियम सीखने होंगे।", en: "We will have to learn the new rules." },
    { hi: "उसने मुझे एक उपहार दिया।", en: "She gave me a gift." },
    { hi: "यह किताब बहुत रोचक है।", en: "This book is very interesting." },
    { hi: "मेरी बस छूट गई।", en: "I missed my bus." },
    { hi: "क्या मौसम कल अच्छा होगा?", en: "Will the weather be good tomorrow?" },
    { hi: "वह घर पर नहीं है।", en: "She is not at home." },
    { hi: "मुझे अपना पासपोर्ट ढूंढना है।", en: "I need to find my passport." },
    { hi: "हम रविवार को यात्रा करेंगे।", en: "We will travel on Sunday." },
    { hi: "वह सब्ज़ियाँ काट रही है।", en: "She is chopping vegetables." },
    { hi: "बच्चे मैदान में दौड़ रहे हैं।", en: "The children are running in the field." },
    { hi: "क्या यह सीट खाली है?", en: "Is this seat empty?" },
    { hi: "मैं आज जल्दी सो जाऊँगा।", en: "I will sleep early today." },
    { hi: "मुझे परीक्षा की चिंता है।", en: "I am worried about the exam." },
    { hi: "उसने दरवाजा खोल दिया।", en: "He opened the door." },
    { hi: "मैंने कक्षा में सवाल पूछा।", en: "I asked a question in class." },
    { hi: "क्या आप मुझे रास्ता बता सकते हैं?", en: "Can you show me the way?" },
    { hi: "उसने सफर रद्द कर दिया।", en: "She canceled the trip." },
    { hi: "हमें एक नया शिक्षक मिला है।", en: "We have a new teacher." },
    { hi: "यह काम आसान नहीं है।", en: "This task is not easy." },
    { hi: "आज बहुत गर्मी है।", en: "It is very hot today." },
    { hi: "मैंने अपना बैग घर पर छोड़ दिया।", en: "I left my bag at home." },
    { hi: "क्या तुम्हें मेरी बात याद है?", en: "Do you remember what I said?" },
    { hi: "वह जल्दी सीखता है।", en: "He learns quickly." },
    { hi: "मुझे यह जगह पसंद है।", en: "I like this place." }
];

const TRANSLATION_DIFFICULTY = "Extra Hard";
const TRANSLATION_OPTION_COUNT = 6;

function normalizeTranslationText(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:"'(){}\[\]-]/g, '')
        .replace(/\u0964/g, '')
        .trim();
}

function tokenizeTranslationText(text) {
    return normalizeTranslationText(text).split(/\s+/).filter(Boolean);
}

function countOverlap(aTokens, bTokens) {
    const bSet = new Set(bTokens);
    let overlap = 0;
    aTokens.forEach(token => {
        if (bSet.has(token)) overlap++;
    });
    return overlap;
}

function buildTranslationOptions(pairs, isHiToEn, correct) {
    const pool = pairs.map(pair => (isHiToEn ? pair.en : pair.hi));
    const correctTokens = tokenizeTranslationText(correct);
    const optionCount = Math.max(3, TRANSLATION_OPTION_COUNT - 1);

    const scored = pool
        .filter(option => option !== correct)
        .map(option => {
            const optionTokens = tokenizeTranslationText(option);
            return {
                option,
                overlap: countOverlap(correctTokens, optionTokens),
                lengthDiff: Math.abs(optionTokens.length - correctTokens.length)
            };
        })
        .sort((a, b) => {
            if (b.overlap !== a.overlap) return b.overlap - a.overlap;
            if (a.lengthDiff !== b.lengthDiff) return a.lengthDiff - b.lengthDiff;
            return Math.random() - 0.5;
        });

    const minOverlap = Math.max(1, Math.floor(correctTokens.length / 3));
    const withOverlap = scored.filter(item => item.overlap >= minOverlap);
    const candidatePool = (withOverlap.length >= optionCount ? withOverlap : scored)
        .slice(0, Math.max(optionCount * 2, 10))
        .map(item => item.option);

    const options = candidatePool.slice(0, optionCount);
    return [correct, ...options].sort(() => Math.random() - 0.5);
}

function getUniqueTranslationPairs(pairs) {
    const seen = new Set();
    return pairs.filter(pair => {
        const key = `${pair.hi}|${pair.en}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function createTranslationQuestion(pair, isHiToEn, pairs) {
    const prompt = isHiToEn ? pair.hi : pair.en;
    const correct = isHiToEn ? pair.en : pair.hi;

    return {
        sentence: prompt,
        correctAnswer: correct,
        options: buildTranslationOptions(pairs, isHiToEn, correct),
        instruction: isHiToEn
            ? `Choose the correct English translation (${TRANSLATION_DIFFICULTY})`
            : `Choose the correct Hindi translation (${TRANSLATION_DIFFICULTY})`,
        type: "translate"
    };
}

const TRANSLATION_EXERCISE_COUNT = 8;
const TRANSLATION_QUESTIONS_PER_EXERCISE = 10;
const TRANSLATION_DIRECTION_SPLIT = TRANSLATION_QUESTIONS_PER_EXERCISE / 2;
const totalPerDirection = TRANSLATION_EXERCISE_COUNT * TRANSLATION_DIRECTION_SPLIT;

const shuffledPairs = [...TRANSLATION_PAIRS].sort(() => Math.random() - 0.5);
const uniquePairs = getUniqueTranslationPairs(shuffledPairs);
const totalPairsNeeded = totalPerDirection * 2;
const selectedPairs = uniquePairs.slice(0, totalPairsNeeded);
const hiToEnPairs = selectedPairs.slice(0, totalPerDirection);
const enToHiPairs = selectedPairs.slice(totalPerDirection, totalPairsNeeded);

const hiToEnQuestions = hiToEnPairs.map(pair => createTranslationQuestion(pair, true, TRANSLATION_PAIRS));
const enToHiQuestions = enToHiPairs.map(pair => createTranslationQuestion(pair, false, TRANSLATION_PAIRS));

const translationExercises = [];
for (let i = 0; i < TRANSLATION_EXERCISE_COUNT; i++) {
    const start = i * TRANSLATION_DIRECTION_SPLIT;
    const questions = [
        ...hiToEnQuestions.slice(start, start + TRANSLATION_DIRECTION_SPLIT),
        ...enToHiQuestions.slice(start, start + TRANSLATION_DIRECTION_SPLIT)
    ].sort(() => Math.random() - 0.5);

    translationExercises.push({
        id: `trans-${i + 1}`,
        title: `Translation Mix ${i + 1} (${TRANSLATION_DIFFICULTY})`,
        questions: questions,
        completed: false,
        bestScore: 0
    });
}

// --- Translation + Grammar Mode Data ---

const GRAMMAR_TRANSLATION_DIFFICULTY = "Extra Hard";
const GRAMMAR_TENSES = [
    "Simple Present",
    "Present Continuous",
    "Present Perfect",
    "Simple Past",
    "Future Simple"
];
const GRAMMAR_VOICES = ["Active Voice", "Passive Voice"];

const GRAMMAR_TRANSLATION_PAIRS = [
    { hi: "मैं बाजार जा रहा हूँ।", en: "I am going to the market.", tense: "Present Continuous", voice: "Active Voice" },
    { hi: "वह एक किताब पढ़ रही है।", en: "She is reading a book.", tense: "Present Continuous", voice: "Active Voice" },
    { hi: "वे पार्क में खेल रहे हैं।", en: "They are playing in the park.", tense: "Present Continuous", voice: "Active Voice" },
    { hi: "बच्चा सो रहा है।", en: "The baby is sleeping.", tense: "Present Continuous", voice: "Active Voice" },
    { hi: "वह बस का इंतज़ार कर रही है।", en: "She is waiting for the bus.", tense: "Present Continuous", voice: "Active Voice" },
    { hi: "वह फोटो खींच रहा है।", en: "He is taking a photo.", tense: "Present Continuous", voice: "Active Voice" },
    { hi: "सूरज पूर्व से उगता है।", en: "The sun rises in the east.", tense: "Simple Present", voice: "Active Voice" },
    { hi: "मुझे चाय पसंद है।", en: "I like tea.", tense: "Simple Present", voice: "Active Voice" },
    { hi: "मेरा भाई मुंबई में रहता है।", en: "My brother lives in Mumbai.", tense: "Simple Present", voice: "Active Voice" },
    { hi: "दुकान नौ बजे खुलती है।", en: "The shop opens at nine.", tense: "Simple Present", voice: "Active Voice" },
    { hi: "वह रोज़ सुबह दौड़ता है।", en: "He runs every morning.", tense: "Simple Present", voice: "Active Voice" },
    { hi: "उसने अपना गृहकार्य पूरा कर लिया है।", en: "He has finished his homework.", tense: "Present Perfect", voice: "Active Voice" },
    { hi: "मैंने अपनी चाबियाँ खो दी हैं।", en: "I have lost my keys.", tense: "Present Perfect", voice: "Active Voice" },
    { hi: "हमने टिकट पहले ही खरीद लिए हैं।", en: "We have already bought the tickets.", tense: "Present Perfect", voice: "Active Voice" },
    { hi: "वह कल स्कूल गई थी।", en: "She went to school yesterday.", tense: "Simple Past", voice: "Active Voice" },
    { hi: "उसने दरवाजा खोल दिया।", en: "He opened the door.", tense: "Simple Past", voice: "Active Voice" },
    { hi: "मैंने कक्षा में सवाल पूछा।", en: "I asked a question in class.", tense: "Simple Past", voice: "Active Voice" },
    { hi: "हम कल मिलेंगे।", en: "We will meet tomorrow.", tense: "Future Simple", voice: "Active Voice" },
    { hi: "ट्रेन प्लेटफॉर्म नंबर तीन पर आएगी।", en: "The train will arrive at platform three.", tense: "Future Simple", voice: "Active Voice" },
    { hi: "हम रविवार को यात्रा करेंगे।", en: "We will travel on Sunday.", tense: "Future Simple", voice: "Active Voice" },
    { hi: "चिट्ठी उसके द्वारा लिखी जा रही है।", en: "The letter is being written by her.", tense: "Present Continuous", voice: "Passive Voice" },
    { hi: "रिपोर्ट टीम द्वारा तैयार की जा रही है।", en: "The report is being prepared by the team.", tense: "Present Continuous", voice: "Passive Voice" },
    { hi: "कंप्यूटर उनके द्वारा ठीक किया जा रहा है।", en: "The computer is being fixed by them.", tense: "Present Continuous", voice: "Passive Voice" },
    { hi: "दरवाजा उनके द्वारा बंद किया जाता है।", en: "The door is closed by them.", tense: "Simple Present", voice: "Passive Voice" },
    { hi: "यह पत्र उसके द्वारा लिखा जाता है।", en: "This letter is written by him.", tense: "Simple Present", voice: "Passive Voice" },
    { hi: "गृहकार्य उसके द्वारा पूरा किया जा चुका है।", en: "The homework has been finished by him.", tense: "Present Perfect", voice: "Passive Voice" },
    { hi: "टिकट उसके द्वारा खरीदे गए हैं।", en: "The tickets have been bought by him.", tense: "Present Perfect", voice: "Passive Voice" },
    { hi: "केक बच्चे द्वारा खाया गया।", en: "The cake was eaten by the child.", tense: "Simple Past", voice: "Passive Voice" },
    { hi: "खिड़की उसके द्वारा खोली गई।", en: "The window was opened by her.", tense: "Simple Past", voice: "Passive Voice" },
    { hi: "पुल मजदूरों द्वारा बनाया जाएगा।", en: "The bridge will be built by the workers.", tense: "Future Simple", voice: "Passive Voice" }
];

function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function buildGrammarTranslationOptions(pairs, isHiToEn, correct, tense, voice) {
    const optionCount = Math.max(3, TRANSLATION_OPTION_COUNT - 1);
    const sameTenseVoice = pairs.filter(pair => pair.tense === tense && pair.voice === voice);
    const sameTense = pairs.filter(pair => pair.tense === tense);
    const sameVoice = pairs.filter(pair => pair.voice === voice);
    const neededPairs = optionCount + 1;

    let candidatePairs = sameTenseVoice;
    if (candidatePairs.length < neededPairs) candidatePairs = sameTense;
    if (candidatePairs.length < neededPairs) candidatePairs = sameVoice;
    if (candidatePairs.length < neededPairs) candidatePairs = pairs;

    return buildTranslationOptions(candidatePairs, isHiToEn, correct);
}

function createGrammarTranslationQuestion(pair, isHiToEn, pairs) {
    const prompt = isHiToEn ? pair.hi : pair.en;
    const correct = isHiToEn ? pair.en : pair.hi;
    const direction = isHiToEn ? "English" : "Hindi";

    return {
        sentence: prompt,
        correctAnswer: correct,
        options: buildGrammarTranslationOptions(pairs, isHiToEn, correct, pair.tense, pair.voice),
        instruction: `Translate to ${direction} (${pair.tense}, ${pair.voice})`,
        type: "grammar_translate"
    };
}

function createGrammarTenseQuestion(pair, useHindiPrompt) {
    const prompt = useHindiPrompt ? pair.hi : pair.en;
    const target = useHindiPrompt ? "English translation" : "sentence";

    return {
        sentence: prompt,
        correctAnswer: pair.tense,
        options: GRAMMAR_TENSES,
        instruction: `Identify the tense of the ${target}`,
        type: "grammar_tense"
    };
}

function createGrammarVoiceQuestion(pair, useHindiPrompt) {
    const prompt = useHindiPrompt ? pair.hi : pair.en;
    const target = useHindiPrompt ? "English translation" : "sentence";

    return {
        sentence: prompt,
        correctAnswer: pair.voice,
        options: GRAMMAR_VOICES,
        instruction: `Identify the voice of the ${target}`,
        type: "grammar_voice"
    };
}

function pickUniquePair(list, cursor, used) {
    if (!list.length) return null;
    let attempts = 0;

    while (attempts < list.length) {
        const pair = list[cursor.value % list.length];
        cursor.value += 1;
        const key = pair.en;

        if (!used.has(key)) {
            used.add(key);
            return pair;
        }
        attempts += 1;
    }

    return list[(cursor.value - 1 + list.length) % list.length];
}

const GRAMMAR_TRANSLATION_EXERCISE_COUNT = 6;
const GRAMMAR_TRANSLATION_QUESTIONS_PER_EXERCISE = 10;

const grammarTranslationExercises = [];
const grammarAllPairs = shuffleArray(GRAMMAR_TRANSLATION_PAIRS);
const grammarActivePairs = shuffleArray(GRAMMAR_TRANSLATION_PAIRS.filter(pair => pair.voice === "Active Voice"));
const grammarPassivePairs = shuffleArray(GRAMMAR_TRANSLATION_PAIRS.filter(pair => pair.voice === "Passive Voice"));
const grammarAllCursor = { value: 0 };
const grammarActiveCursor = { value: 0 };
const grammarPassiveCursor = { value: 0 };
const grammarTensePools = {};
const grammarTenseCursors = {};

GRAMMAR_TENSES.forEach(tense => {
    grammarTensePools[tense] = shuffleArray(GRAMMAR_TRANSLATION_PAIRS.filter(pair => pair.tense === tense));
    grammarTenseCursors[tense] = { value: 0 };
});

for (let i = 0; i < GRAMMAR_TRANSLATION_EXERCISE_COUNT; i++) {
    const used = new Set();
    const questions = [];

    const transPairs = [
        pickUniquePair(grammarAllPairs, grammarAllCursor, used),
        pickUniquePair(grammarAllPairs, grammarAllCursor, used),
        pickUniquePair(grammarAllPairs, grammarAllCursor, used),
        pickUniquePair(grammarAllPairs, grammarAllCursor, used)
    ].filter(Boolean);

    if (transPairs[0]) questions.push(createGrammarTranslationQuestion(transPairs[0], true, GRAMMAR_TRANSLATION_PAIRS));
    if (transPairs[1]) questions.push(createGrammarTranslationQuestion(transPairs[1], true, GRAMMAR_TRANSLATION_PAIRS));
    if (transPairs[2]) questions.push(createGrammarTranslationQuestion(transPairs[2], false, GRAMMAR_TRANSLATION_PAIRS));
    if (transPairs[3]) questions.push(createGrammarTranslationQuestion(transPairs[3], false, GRAMMAR_TRANSLATION_PAIRS));

    const tenseList = shuffleArray(GRAMMAR_TENSES).slice(0, 3);
    tenseList.forEach(tense => {
        const pair = pickUniquePair(grammarTensePools[tense], grammarTenseCursors[tense], used);
        if (pair) questions.push(createGrammarTenseQuestion(pair, true));
    });

    const voiceActivePair = pickUniquePair(grammarActivePairs, grammarActiveCursor, used);
    const voicePassivePair = pickUniquePair(grammarPassivePairs, grammarPassiveCursor, used);
    const thirdFromActive = i % 2 === 0;
    const voiceThirdPair = pickUniquePair(
        thirdFromActive ? grammarActivePairs : grammarPassivePairs,
        thirdFromActive ? grammarActiveCursor : grammarPassiveCursor,
        used
    );

    if (voiceActivePair) questions.push(createGrammarVoiceQuestion(voiceActivePair, true));
    if (voicePassivePair) questions.push(createGrammarVoiceQuestion(voicePassivePair, true));
    if (voiceThirdPair) questions.push(createGrammarVoiceQuestion(voiceThirdPair, true));

    grammarTranslationExercises.push({
        id: `gram-${i + 1}`,
        title: `Voice + Tense Translation ${i + 1} (${GRAMMAR_TRANSLATION_DIFFICULTY})`,
        questions: questions.slice(0, GRAMMAR_TRANSLATION_QUESTIONS_PER_EXERCISE).sort(() => Math.random() - 0.5),
        completed: false,
        bestScore: 0
    });
}

// --- App State ---
let currentMode = 'identify'; // 'identify', 'fill', 'voice', 'translate', or 'grammar'
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

            if (currentMode === 'identify') currentExerciseList = identifyExercises;
            else if (currentMode === 'fill') currentExerciseList = fillExercises;
            else if (currentMode === 'voice') currentExerciseList = voiceExercises;
            else if (currentMode === 'translate') currentExerciseList = translationExercises;
            else if (currentMode === 'grammar') currentExerciseList = grammarTranslationExercises;

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
