// --- PSYCHOMETRIC DATA & SCORING LOGIC ---

const testsData = [
    {
        id: 'gad-7', title: 'GAD-7',
        shortDesc: 'Measures anxiety severity.',
        type: 'slider',
        scale: [ { val: 0, label: "0 - Not at all" }, { val: 1, label: "1 - Several days" }, { val: 2, label: "2 - More than half the days" }, { val: 3, label: "3 - Nearly every day" } ],
        questions: [
            "Feeling nervous, anxious, or on edge", "Not being able to stop or control worrying", "Worrying too much about different things",
            "Trouble relaxing", "Being so restless that it is hard to sit still", "Becoming easily annoyed or irritable", "Feeling afraid, as if something awful might happen"
        ],
        calculate: (answers) => {
            let score = answers.reduce((a, b) => a + b, 0);
            let category = score <= 4 ? "Minimal Anxiety" : score <= 9 ? "Mild Anxiety" : score <= 14 ? "Moderate Anxiety" : "Severe Anxiety";
            return { 
                title: category, 
                desc: `<b>Total Score: ${score} / 21</b><br><br><b>Clinical Insight:</b><br>Scores of 5, 10, and 15 represent the clinical cut-points for mild, moderate, and severe anxiety thresholds. Your score suggests ${category.toLowerCase()}.`
            };
        }
    },
    {
        id: 'phq-9', title: 'PHQ-9',
        shortDesc: 'Assesses depression levels.',
        type: 'slider',
        scale: [ { val: 0, label: "0 - Not at all" }, { val: 1, label: "1 - Several days" }, { val: 2, label: "2 - More than half the days" }, { val: 3, label: "3 - Nearly every day" } ],
        questions: [
            "Little interest or pleasure in doing things", "Feeling down, depressed, or hopeless", "Trouble falling or staying asleep, or sleeping too much",
            "Feeling tired or having little energy", "Poor appetite or overeating", "Feeling bad about yourself — or that you are a failure",
            "Trouble concentrating on things, such as reading or watching television", "Moving or speaking so slowly that other people could have noticed, or being extremely fidgety",
            "Thoughts that you would be better off dead or of hurting yourself in some way"
        ],
        calculate: (answers) => {
            let score = answers.reduce((a, b) => a + b, 0);
            let category = score <= 4 ? "Minimal Depression" : score <= 9 ? "Mild Depression" : score <= 14 ? "Moderate Depression" : score <= 19 ? "Moderately Severe Depression" : "Severe Depression";
            let urgentFlag = answers[8] > 0 ? "<br><br><span style='color:#ff5e5e;'><b>Note:</b> You indicated thoughts of self-harm. Please reach out to a professional immediately.</span>" : "";
            return { 
                title: category, 
                desc: `<b>Total Score: ${score} / 27</b><br><br>The PHQ-9 measures intensity of depressive symptoms. Your current baseline indicates ${category.toLowerCase()}.${urgentFlag}`
            };
        }
    },
    {
        id: 'eysenck', title: 'Eysenck EPQ-R',
        shortDesc: 'Measures PEN personality traits.',
        type: 'binary',
        questions: [
            "Do you have many different hobbies?", "Do you stop to think things over before doing anything?", "Does your mood often go up and down?", "Have you ever taken the praise for something you knew someone else had really done?", "Do you take much notice of what people think?", "Are you a talkative person?", "Would being in debt worry you?", "Do you ever feel ‘just miserable’ for no reason?", "Do you give money to charities?", "Were you ever greedy by helping yourself to more than your share of anything?",
            "Are you rather lively?", "Would it upset you a lot to see a child or an animal suffer?", "Do you often worry about things you should not have done or said?", "Do you dislike people who don’t know how to behave themselves?", "If you say you will do something, do you always keep your promise no matter how inconvenient it might be?", "Can you usually let yourself go and enjoy yourself at a lively party?", "Are you an irritable person?", "Should people always respect the law?", "Have you ever blamed someone for doing something you knew was really your fault?", "Do you enjoy meeting new people?"
        ],
        calculate: (answers) => {
            const check = (list, targetValue) => {
                let count = 0;
                list.forEach(qNum => { if (answers[qNum - 1] === targetValue) count++; });
                return count;
            };
            const eYes = [1, 6, 11, 16, 20]; let E = check(eYes, 1);
            const nYes = [3, 8, 13, 17]; let N = check(nYes, 1);
            const pYes = [12]; let P = check(pYes, 1); 
            const lYes = [4, 10, 15]; let L = check(lYes, 1);
            return { 
                title: "Temperament Matrix", 
                desc: `<b>Extraversion (E):</b> ${E}<br><b>Neuroticism (N):</b> ${N}<br><b>Psychoticism (P):</b> ${P}<br><b>Lie Scale (L):</b> ${L}`
            };
        }
    },
    {
        id: 'riasec', title: 'RIASEC',
        shortDesc: 'Vocational interest & career personality.',
        type: 'binary',
        questions: [
            "Do you enjoy repairing mechanical things?", "Do you like to solve complex math problems?", "Do you enjoy creative writing or poetry?", "Do you like helping people with their problems?", "Do you enjoy leading or managing a team?", "Do you like keeping detailed records and files?",
            "Are you good at working with tools?", "Do you enjoy scientific research?", "Do you like sketching, drawing, or painting?", "Do you enjoy teaching or training others?", "Do you like to persuade people to buy things?", "Do you enjoy following a set routine at work?"
        ],
        calculate: (answers) => {
            const scores = { R:0, I:0, A:0, S:0, E:0, C:0 };
            const keys = ['R', 'I', 'A', 'S', 'E', 'C'];
            answers.forEach((ans, i) => { if(ans === 1) scores[keys[i % 6]]++; });
            const topTrait = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            const traitNames = { R: "Realistic", I: "Investigative", A: "Artistic", S: "Social", E: "Enterprising", C: "Conventional" };
            return {
                title: `Theme: ${traitNames[topTrait]}`,
                desc: `<b>Score Profile:</b> R:${scores.R} | I:${scores.I} | A:${scores.A} | S:${scores.S} | E:${scores.E} | C:${scores.C}<br><br>Your top trait suggests you thrive in <b>${traitNames[topTrait]}</b> environments.`
            };
        }
    },
    {
        id: 'bfi-10', title: 'BFI-10',
        shortDesc: 'The Big Five Inventory (Short Form).',
        type: 'slider',
        scale: [ {val: 1, label: "1 - Disagree Strongly"}, {val: 2, label: "2 - Disagree Little"}, {val: 3, label: "3 - Neutral"}, {val: 4, label: "4 - Agree Little"}, {val: 5, label: "5 - Agree Strongly"} ],
        questions: [
            "I see myself as someone who is reserved. [REVERSE]", "I see myself as someone who is generally trusting.", "I see myself as someone who tends to be lazy. [REVERSE]", "I see myself as someone who is relaxed, handles stress well. [REVERSE]", "I see myself as someone who has few artistic interests. [REVERSE]",
            "I see myself as someone who is outgoing, sociable.", "I see myself as someone who tends to find fault with others. [REVERSE]", "I see myself as someone who does a thorough job.", "I see myself as someone who gets nervous easily.", "I see myself as someone who has an active imagination."
        ],
        calculate: (answers) => {
            const E = (answers[0] + answers[5]) / 2;
            const A = (answers[1] + answers[6]) / 2;
            const C = (answers[2] + answers[7]) / 2;
            const N = (answers[3] + answers[8]) / 2;
            const O = (answers[4] + answers[9]) / 2;
            return {
                title: "Personality Core (OCEAN)",
                desc: `<b>Scores (1-5):</b><br>O: ${O.toFixed(1)} | C: ${C.toFixed(1)} | E: ${E.toFixed(1)} | A: ${A.toFixed(1)} | N: ${N.toFixed(1)}`
            };
        }
    },
    {
        id: 'asrs', title: 'ASRS v1.1',
        shortDesc: 'ADHD Adult Self-Report Scale.',
        type: 'slider',
        scale: [ {val: 0, label: "0 - Never"}, {val: 1, label: "1 - Rarely"}, {val: 2, label: "2 - Sometimes"}, {val: 3, label: "3 - Often"}, {val: 4, label: "4 - Very Often"} ],
        questions: [
            "How often do you have trouble wrapping up the final details of a project?", "How often do you have difficulty getting things in order?", "How often do you have problems remembering appointments?", "When you have a task that requires thought, how often do you avoid it?",
            "How often do you fidget or squirm?", "How often do you feel overly active, as if driven by a motor?"
        ],
        calculate: (answers) => {
            let markers = 0;
            if (answers[0] >= 2) markers++; if (answers[1] >= 2) markers++; if (answers[2] >= 2) markers++;
            if (answers[3] >= 3) markers++; if (answers[4] >= 3) markers++; if (answers[5] >= 3) markers++;
            return {
                title: markers >= 4 ? "Significant Screening" : "Minimal Screening",
                desc: `<b>Markers Detected: ${markers} of 6</b><br><br>Individuals with 4 or more markers have symptoms highly consistent with ADHD.`
            };
        }
    },
    {
        id: 'tis-40', title: 'TIS-40 (Mind_TRM)',
        shortDesc: 'Trauma Integration Scale.',
        type: 'slider',
        scale: [ { val: 0, label: "0 - Never" }, { val: 1, label: "1 - Rarely" }, { val: 2, label: "2 - Sometimes" }, { val: 3, label: "3 - Often" }, { val: 4, label: "4 - Always" } ],
        questions: [
            "I experience sudden, intrusive memories of difficult events.", "I have dreams or nightmares related to past experiences.", "I feel as though past events are happening in the present moment.", "[REVERSE] I am able to think about my past without feeling overwhelmed.", "Physical sensations (shaking, heart racing) occur when I remember the past.", "[REVERSE] I can recall positive memories as clearly as negative ones.", "I struggle to maintain a consistent narrative of my personal history.", "Certain smells or sounds trigger immediate distress.", "[REVERSE] I feel in control of when I think about my history.", "I feel a sense of 'blank spots' or amnesia regarding specific years.",
            "I go out of my way to avoid places that remind me of the past.", "I avoid specific people because they trigger difficult thoughts.", "[REVERSE] I find it easy to stay emotionally present in conversations.", "I feel a sense of detachment or 'fogginess' from the world.", "[REVERSE] I am able to experience deep joy or excitement.", "I push down my feelings to keep from losing control.", "I feel 'shut down' when people get too close to me.", "[REVERSE] I am interested in my usual hobbies and activities.", "I feel 'numb' even when I know I should be feeling something.", "[REVERSE] I actively seek out new experiences without fear of triggers.",
            "I feel constantly 'on guard' or hyper-vigilant.", "I startle easily at loud noises or sudden movements.", "[REVERSE] I find it easy to fall and stay asleep.", "I feel irritable or have sudden outbursts of anger.", "I struggle to concentrate on complex tasks (like coding).", "[REVERSE] I feel safe and grounded in my current physical space.", "[REVERSE] I am able to identify physical triggers before they overwhelm me.", "My body feels tense or 'braced' for impact most of the day.", "[REVERSE] I can relax my muscles at will.", "I feel a constant sense of impending 'danger'.",
            "I feel a sense of permanent 'damage' inside me.", "[REVERSE] I believe I am worthy of care and support.", "I find it difficult to trust the intentions of others.", "I feel 'different' or 'broken' compared to my peers.", "[REVERSE] I am able to ask for help when I am struggling.", "I carry a strong sense of guilt or shame about things I couldn't control.", "[REVERSE] I feel confident in my ability to handle future challenges.", "I feel isolated even when I am surrounded by people.", "[REVERSE] I find it easy to set healthy boundaries with others.", "[REVERSE] I feel that my life has a clear purpose and direction."
        ],
        calculate: (answers) => {
            let totalScore = answers.reduce((a, b) => a + b, 0);
            let category, interpretation;
            if (totalScore <= 40) { category = "Minimal Impact"; interpretation = "High level of integration."; }
            else if (totalScore <= 80) { category = "Moderate Impact"; interpretation = "Developing integration."; }
            else if (totalScore <= 120) { category = "Significant Impact"; interpretation = "Trauma is actively impacting daily life."; }
            else { category = "Severe Impact"; interpretation = "High level of distress."; }
            return { title: category, desc: `<b>Total Score: ${totalScore} / 160</b><br><br>${interpretation}` };
        }
    }
];

// --- APP STATE ---
let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let pendingTestId = null;

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const appContainer = document.getElementById('app-container');
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const testGrid = document.getElementById('test-grid');
const questionText = document.getElementById('question-text');
const progressBar = document.getElementById('progress-bar');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const mainAppName = document.getElementById('main-app-name');

// Input UI Elements
const sliderWrapper = document.getElementById('slider-wrapper');
const binaryWrapper = document.getElementById('binary-wrapper');
const slider = document.getElementById('answer-slider');
const sliderLabel = document.getElementById('slider-label');
const disclaimerModal = document.getElementById('disclaimer-modal');

// --- UI LOGIC ---

function enterApp() {
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.classList.remove('active');
        introScreen.style.display = 'none';
        appContainer.classList.remove('hidden');
        appContainer.classList.add('active');
        
        setTimeout(() => {
            appContainer.style.opacity = '1';
            appContainer.style.transform = 'translateY(0)';
            init(); 
        }, 50);
    }, 1000);
}

function init() {
    testGrid.innerHTML = '';
    testsData.forEach((test, index) => {
        const card = document.createElement('div');
        card.className = 'test-card slide-up-fade';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `<h3>${test.title}</h3><p>${test.shortDesc}</p>`;
        
        card.addEventListener('mouseenter', () => mainAppName.classList.add('text-glow'));
        card.addEventListener('mouseleave', () => mainAppName.classList.remove('text-glow'));
        
        card.addEventListener('click', () => {
            if (test.id === 'tis-40') {
                pendingTestId = test.id;
                disclaimerModal.classList.remove('hidden');
            } else {
                startTest(test.id);
            }
        });
        testGrid.appendChild(card);
    });
}

// Disclaimer Flow
function closeDisclaimer() {
    disclaimerModal.classList.add('hidden');
    pendingTestId = null;
}

function acceptDisclaimer() {
    disclaimerModal.classList.add('hidden');
    if (pendingTestId) startTest(pendingTestId);
}

function startTest(testId) {
    currentTest = testsData.find(t => t.id === testId);
    currentQuestionIndex = 0;
    userAnswers = [];
    
    // Toggle UI based on test type
    if (currentTest.type === 'binary') {
        // Show Yes/No, Hide Slider
        sliderWrapper.classList.add('hidden-hard');
        binaryWrapper.classList.remove('hidden');
    } else {
        // Show Slider, Hide Yes/No
        sliderWrapper.classList.remove('hidden-hard');
        binaryWrapper.classList.add('hidden');
        
        // Setup Slider Bounds
        slider.min = currentTest.scale[0].val;
        slider.max = currentTest.scale[currentTest.scale.length - 1].val;
        slider.value = currentTest.scale[0].val; // Reset to start
    }
    
    switchSubScreen(homeScreen, quizScreen);
    loadQuestion();
}

function loadQuestion() {
    if (currentTest.type === 'slider') {
        slider.value = currentTest.scale[0].val; // Reset visually
        updateSliderLabel();
    }

    // Clean up [REVERSE] tags for display if they exist
    let qString = currentTest.questions[currentQuestionIndex];
    let displayString = qString.replace('[REVERSE] ', '');

    questionText.classList.remove('slide-up-fade');
    void questionText.offsetWidth; // Reflow
    questionText.innerText = displayString;
    questionText.classList.add('slide-up-fade');

    const progress = (currentQuestionIndex / currentTest.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// --- INPUT LOGIC ---

// Slider visually updates label continuously based on mathematical rounding
slider.addEventListener('input', updateSliderLabel);

function updateSliderLabel() {
    const currentVal = Math.round(parseFloat(slider.value));
    const scaleItem = currentTest.scale.find(s => s.val === currentVal);
    
    if (scaleItem) {
        // Find the index of the dash to style the label cleanly
        let splitText = scaleItem.label.split(' - ');
        if(splitText.length > 1) {
            sliderLabel.innerHTML = `${splitText[0]} - <b>${splitText[1]}</b>`;
        } else {
            sliderLabel.innerText = scaleItem.label;
        }
    }
}

function submitSliderAnswer() {
    let finalAnswer = Math.round(parseFloat(slider.value));
    let qText = currentTest.questions[currentQuestionIndex];
    
    // Check if the current question is tagged for reverse scoring
    if (qText.includes('[REVERSE]')) {
        let min = parseInt(slider.min);
        let max = parseInt(slider.max);
        finalAnswer = (min + max) - finalAnswer;
    }
    
    userAnswers.push(finalAnswer);
    processNext();
}

function submitBinaryAnswer(value) {
    // 1 for Yes, 0 for No
    userAnswers.push(value);
    processNext();
}

function processNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentTest.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    progressBar.style.width = '100%';
    setTimeout(() => {
        const resultData = currentTest.calculate(userAnswers);
        resultTitle.innerHTML = resultData.title;
        resultDescription.innerHTML = resultData.desc;
        
        switchSubScreen(quizScreen, resultsScreen);
    }, 400); 
}

function returnHome() {
    switchSubScreen(quizScreen, homeScreen);
    switchSubScreen(resultsScreen, homeScreen);
    init();
}

function switchSubScreen(hideElement, showElement) {
    hideElement.classList.remove('active');
    hideElement.classList.add('hidden');
    showElement.classList.remove('hidden');
    showElement.classList.add('active');
}