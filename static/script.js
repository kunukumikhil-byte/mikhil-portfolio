/* ==========================================================
   1. 3D COVERFLOW CERTIFICATIONS CAROUSEL
   ========================================================== */
let currentIndex = 0;
let autoSlideTimer;

const cards = document.querySelectorAll('.cert-card');
const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    const totalCards = cards.length;
    if (totalCards === 0) return;

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
    if (totalCards === 0) return;
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
    if (cards.length > 0) {
        autoSlideTimer = setInterval(() => {
            moveSlide(1);
        }, 3500); // Transitions automatically every 3.5 seconds
    }
}

function resetAutoPlay() {
    clearInterval(autoSlideTimer);
    startAutoPlay();
}

/* ==========================================================
   2. PROJECT 3D MINI COVERFLOW & AUTO-SLIDE LOGIC
   ========================================================== */
const projectSliderStates = {};
let projectAutoSlideTimer;

function updateProjectCoverflow(sliderId) {
    const sliderContainer = document.getElementById(sliderId);
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll('.project-slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    if (projectSliderStates[sliderId] === undefined) {
        projectSliderStates[sliderId] = 0;
    }

    const currentProjectIndex = projectSliderStates[sliderId];

    slides.forEach((slide, index) => {
        // Clear previous state classes
        slide.classList.remove('active', 'left-card', 'right-card');

        let leftIndex = (currentProjectIndex - 1 + totalSlides) % totalSlides;
        let rightIndex = (currentProjectIndex + 1) % totalSlides;

        if (index === currentProjectIndex) {
            slide.classList.add('active');
            // If the slide is a video, play it automatically
            if (slide.tagName.toLowerCase() === 'video') {
                slide.play().catch(() => {});
            }
        } else if (index === leftIndex) {
            slide.classList.add('left-card');
            if (slide.tagName.toLowerCase() === 'video') slide.pause();
        } else if (index === rightIndex) {
            slide.classList.add('right-card');
            if (slide.tagName.toLowerCase() === 'video') slide.pause();
        } else {
            if (slide.tagName.toLowerCase() === 'video') slide.pause();
        }
    });
}

function moveProjectSlide(sliderId, direction) {
    const sliderContainer = document.getElementById(sliderId);
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll('.project-slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    if (projectSliderStates[sliderId] === undefined) {
        projectSliderStates[sliderId] = 0;
    }

    projectSliderStates[sliderId] = (projectSliderStates[sliderId] + direction + totalSlides) % totalSlides;
    updateProjectCoverflow(sliderId);
    resetProjectAutoPlay();
}

function startProjectAutoPlay() {
    projectAutoSlideTimer = setInterval(() => {
        // Automatically cycle all project mini-coverflows
        const sliders = document.querySelectorAll('.project-slider');
        sliders.forEach(slider => {
            if (slider.id) {
                moveProjectSlide(slider.id, 1);
            }
        });
    }, 4000); // Auto-slides every 4 seconds
}

function resetProjectAutoPlay() {
    clearInterval(projectAutoSlideTimer);
    startProjectAutoPlay();
}

/* ==========================================================
   3. INITIALIZATION ON DOM READY
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize certifications carousel
    updateCarousel();
    startAutoPlay();

    // Initialize all project mini coverflows
    const projectSliders = document.querySelectorAll('.project-slider');
    projectSliders.forEach(slider => {
        if (slider.id) {
            updateProjectCoverflow(slider.id);
        }
    });

    // Start auto-play for project coverflows
    startProjectAutoPlay();
});