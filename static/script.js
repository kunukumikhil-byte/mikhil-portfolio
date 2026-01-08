/* Typing Animation */
const roles = [
    "ECE Student",
    "Microelectronics Enthusiast",
    "Web & App Developer",
    "AI Explorer",
    "Founder of Jupiter Tech"
];

let i = 0, j = 0, deleting = false;
const typingElement = document.getElementById("typing");

function typingEffect() {
    const current = roles[i];
    typingElement.textContent = current.substring(0, j);
    j = deleting ? j - 1 : j + 1;

    if (!deleting && j === current.length) {
        deleting = true;
        setTimeout(typingEffect, 1000);
        return;
    }
    if (deleting && j === 0) {
        deleting = false;
        i = (i + 1) % roles.length;
    }
    setTimeout(typingEffect, deleting ? 80 : 120);
}
typingEffect();


/* Particles Background */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const count = 100;

for (let p = 0; p < count; p++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2 + 1
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#22d3ee";
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();


/* Scroll Reveal Animation */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(el => {
        const position = el.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}

/* Store Messages in DB */
const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusText.textContent = "Sending...";

    const res = await fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        })
    });

    if (res.ok) {
        statusText.textContent = "✅ Message stored successfully!";
        form.reset();
    } else {
        statusText.textContent = "❌ Failed to send message.";
    }
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();