
// Questions and answers
const questions = [
    {
        emoji: "🥰",
        title: "A Sweet Beginning",
        text: "Do you enjoy talking with me?",
        options: ["Of course! 💗", "Absolutely! 🥹"],
        feedback: "That makes me happy! 💕"
    },
    {
        emoji: "😊",
        title: "A Little Smile",
        text: "Do I make you smile sometimes?",
        options: ["Yes! 🌸", "Definitely! ❤️"],
        feedback: "Keep that beautiful smile! 😊"
    },
    {
        emoji: "🧸",
        title: "A Cute Question",
        text: "Do you like our little moments?",
        options: ["I do! 💖", "Very much! 🥰"],
        feedback: "Those moments are special! 💗"
    },
    {
        emoji: "🌷",
        title: "One More",
        text: "Would you like to make more memories together?",
        options: ["Yes! 🎀", "Of course! 💕"],
        feedback: "Here's to more happy memories! 🌷"
    },
    {
        emoji: "🎁",
        title: "The Final Question",
        text: "Are you ready for your final surprise?",
        options: ["Show me! 😍", "I'm ready! 💝"],
        feedback: "Then here comes your surprise! 🎉"
    }
];

let currentQuestion = 0;
let yesSize = 16;
let noMoves = 0;

const screens = document.querySelectorAll(".screen");
const answers = document.getElementById("answers");
const questionEmoji = document.getElementById("questionEmoji");
const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const progress = document.getElementById("progress");
const feedback = document.getElementById("feedback");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Change screen
function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(id);

    if (nextScreen) {
        nextScreen.classList.add("active");
    }
}

// Start questions
function startQuestions() {
    currentQuestion = 0;
    loadQuestion();
    showScreen("questions");
}

// Load question
function loadQuestion() {
    const q = questions[currentQuestion];

    questionEmoji.textContent = q.emoji;
    questionTitle.textContent = q.title;
    questionText.textContent = q.text;
    progress.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    feedback.textContent = "";
    answers.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");

        button.textContent = option;
        button.addEventListener("click", answerQuestion);

        answers.appendChild(button);
    });
}

// Answer question
function answerQuestion() {
    feedback.textContent = questions[currentQuestion].feedback;

    answers.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });

    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showScreen("final");
        }
    }, 900);
}

// Open proposal
function showProposal() {
    yesSize = 16;
    noMoves = 0;

    yesBtn.style.fontSize = yesSize + "px";

    noBtn.style.position = "relative";
    noBtn.style.left = "auto";
    noBtn.style.top = "auto";

    document.getElementById("proposalMessage").textContent = "";

    showScreen("proposal");
}

// Move NO button
function moveNoButton() {
    if (!document.getElementById("proposal").classList.contains("active")) {
        return;
    }

    const margin = 15;

    const maxX = Math.max(margin, window.innerWidth - noBtn.offsetWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - noBtn.offsetHeight - margin);

    const x = margin + Math.random() * (maxX - margin);
    const y = margin + Math.random() * (maxY - margin);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    noMoves++;

    yesSize = Math.min(16 + noMoves * 3, 40);
    yesBtn.style.fontSize = yesSize + "px";
}

// Desktop mouse movement
noBtn.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse") {
        moveNoButton();
    }
});

// Mobile touch movement
noBtn.addEventListener("touchstart", event => {
    event.preventDefault();
    moveNoButton();
}, { passive: false });

// YES answer
function sayYes() {
    showScreen("celebration");
    createHearts();
}

// NO answer
function sayNo() {
    document.getElementById("proposalMessage").textContent =
        "That's okay! Thank you for answering honestly. 💗";

    noBtn.style.position = "relative";
    noBtn.style.left = "auto";
    noBtn.style.top = "auto";
}

// Floating hearts
function createHearts() {
    const container = document.getElementById("hearts");
    const symbols = ["❤️", "💗", "💕", "💖", "💝"];

    for (let i = 0; i < 22; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (16 + Math.random() * 20) + "px";
        heart.style.animationDelay = Math.random() * 3 + "s";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 9000);
    }
}
