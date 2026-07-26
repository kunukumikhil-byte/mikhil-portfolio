let currentIndex = 0;
let autoSlideTimer;

const cards = document.querySelectorAll('.cert-card');
const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    const totalCards = cards.length;

    cards.forEach((card, index) => {
        // Clear old state classes
        card.classList.remove('active', 'left-card', 'right-card');

        // Calculate positions relative to current index
        let leftIndex = (currentIndex - 1 + totalCards) % totalCards;
        let rightIndex = (currentIndex + 1) % totalCards;

        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === leftIndex) {
            card.classList.add('left-card');
        } else if (index === rightIndex) {
            card.classList.add('right-card');
        }
    });

    // Update Dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function moveSlide(direction) {
    const totalCards = cards.length;
    currentIndex = (currentIndex + direction + totalCards) % totalCards;
    updateCarousel();
    resetAutoPlay();
}

function setSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoPlay();
}

function startAutoPlay() {
    autoSlideTimer = setInterval(() => {
        moveSlide(1);
    }, 3500); // Transitions automatically every 3.5 seconds
}

function resetAutoPlay() {
    clearInterval(autoSlideTimer);
    startAutoPlay();
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startAutoPlay();
});