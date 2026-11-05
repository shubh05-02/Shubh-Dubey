// Welcome button
function showMemories() {
    document.getElementById("main-content")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// Background music
function toggleMusic() {
    const music = document.getElementById("music");
    const button = document.getElementById("musicButton");

    if (music.paused) {
        music.play()
            .then(() => {
                button.innerText = "⏸ Pause Music";
            })
            .catch(() => {
                alert("Please check your music file!");
            });
    } else {
        music.pause();
        button.innerText = "▶ Play Music";
    }
}

// Surprise ending
function showSurprise() {
    const surprise = document.getElementById("surprise");

    surprise.style.display = "block";

    surprise.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    createHearts(30);
}

// Floating hearts animation
function createHearts(count) {
    const container = document.getElementById("hearts");

    for (let i = 0; i < count; i++) {
        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerText = [
            "💗",
            "💕",
            "💖",
            "🌸",
            "❤️"
        ][Math.floor(Math.random() * 5)];

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize =
            (15 + Math.random() * 20) + "px";

        heart.style.animationDuration =
            (4 + Math.random() * 4) + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8500);
    }
}

// Automatic floating hearts
setInterval(() => {
    createHearts(2);
}, 1200);
