// Application state
let currentQuestion = 1;
const totalQuestions = 5;
let countdownStarted = false; // Track if countdown has been started

// Video is now hardcoded in HTML - just show/hide the container
// To change the video: update the src in the HTML iframe directly

// DOM elements
const questionScreens = document.querySelectorAll('.question-screen');
const yesButton = document.getElementById('yes-btn');
const noButton = document.getElementById('no-btn');
const disbeliefModal = document.getElementById('disbelief-modal');
const videoIframe = document.getElementById('video-container'); // Now the iframe itself
const kindleBackground = document.getElementById('kindle-background');
const videoClickOverlay = document.getElementById('video-click-overlay');
const buttonsContainer = document.querySelector('.buttons-container');

// Initialize the application
function init() {
    yesButton.addEventListener('click', handleYesClick);
    noButton.addEventListener('click', handleNoClick);
    
    // Hide video iframe initially via visibility
    if (videoIframe) {
        videoIframe.style.top = '0'; // Position correctly from start
        videoIframe.style.visibility = 'hidden'; // But hide it
        console.log('Video iframe positioned correctly but hidden via visibility');
    } else {
        console.error('Video iframe element not found during init');
    }
    
    // Make sure kindle background is initially hidden
    if (kindleBackground) {
        console.log('Kindle background initialized and hidden');
    } else {
        console.error('Kindle background element not found during init');
    }
    
    // Setup click handler for overlay
    if (videoClickOverlay) {
        videoClickOverlay.addEventListener('click', handleOverlayClick);
        console.log('Click overlay initialized');
    } else {
        console.error('Video click overlay element not found during init');
    }
    
    // Show first question with animation
    showQuestion(1);
}

// Handle Yes button click
function handleYesClick() {
    if (currentQuestion < totalQuestions) {
        // Move to next question
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        // Last question - show the surprise video
        showSurpriseVideo();
    }
}

// Handle No button click
function handleNoClick() {
    showDisbeliefModal();
}

// Handle overlay click to start countdown
function handleOverlayClick() {
    if (!countdownStarted) {
        console.log('=== Overlay clicked! Starting video and countdown ===');
        countdownStarted = true; // Prevent multiple countdowns
        
        // Hide the overlay immediately
        videoClickOverlay.classList.remove('show');
        videoClickOverlay.style.pointerEvents = 'none';
        
        // Enable pointer events on the iframe so user can interact with video
        videoIframe.style.pointerEvents = 'auto';
        
        // Start the video by modifying the iframe src to include autoplay
        const currentSrc = videoIframe.src;
        const autoplaySrc = currentSrc + '&autoplay=1';
        videoIframe.src = autoplaySrc;
        console.log('Video autoplay enabled');
        
        // Start the countdown immediately
        startFadeCountdown();
    }
}

// Show a specific question with animation
function showQuestion(questionNumber) {
    // Hide all questions
    questionScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Add a small delay for smooth transition
    setTimeout(() => {
        // Show the target question
        const targetQuestion = document.getElementById(`question-${questionNumber}`);
        targetQuestion.classList.add('active');
        
        // Trigger the slide up animation by resetting and reapplying
        const heading = targetQuestion.querySelector('.question-heading');
        heading.style.animation = 'none';
        heading.offsetHeight; // Trigger reflow
        heading.style.animation = 'slideUpFadeInBounce 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    }, 200);
}

// Show the disbelief modal
function showDisbeliefModal() {
    disbeliefModal.classList.add('show');
    
    // Hide modal after 2 seconds with fade out
    setTimeout(() => {
        disbeliefModal.classList.remove('show');
    }, 2000);
}

// Show the surprise video
function showSurpriseVideo() {
    console.log('=== showSurpriseVideo called ===');
    
    if (!videoIframe) {
        console.error('Video iframe element not found!');
        return;
    }
    
    if (!kindleBackground) {
        console.error('Kindle background element not found!');
        return;
    }
    
    if (!videoClickOverlay) {
        console.error('Video click overlay element not found!');
        return;
    }
    
    // Hide questions and buttons
    document.querySelector('.container').style.display = 'none';
    console.log('Container hidden');
    
    // Show video iframe by making it visible
    console.log('Video visibility before:', videoIframe.style.visibility);
    videoIframe.style.visibility = 'visible';
    console.log('Video iframe made visible!');
    
    // Show the click overlay after a short delay to ensure video is loaded
    setTimeout(() => {
        videoClickOverlay.classList.add('show');
        console.log('Click overlay shown - waiting for user to click to start countdown');
    }, 500);
    
    // Confirm the change
    setTimeout(() => {
        console.log('Video visibility after:', window.getComputedStyle(videoIframe).visibility);
        console.log('Video should now be playing... Click anywhere to start the countdown!');
    }, 100);
}

// Start countdown for fade transition at 1 minute mark
function startFadeCountdown() {
    console.log('=== Starting 1-minute countdown for fade transition ===');
    
    // Set timer for 1 minute (60 seconds = 60000 milliseconds)
    setTimeout(() => {
        startFadeTransition();
    }, 53000);
}


// Start the fade transition: fade out video, fade in kindle background
function startFadeTransition() {
    console.log('=== Starting fade transition ===');
    
    if (!videoIframe || !kindleBackground) {
        console.error('Video iframe or kindle background element not found!');
        return;
    }
    
    // Start fading out the video (5 second transition)
    console.log('Fading out video...');
    videoIframe.classList.add('fade-out');
    
    // Simultaneously start fading in the kindle background (5 second transition)  
    console.log('Fading in kindle background...');
    kindleBackground.classList.add('fade-in');
    
    // Optional: Add celebration effects after the fade completes
    setTimeout(() => {
        console.log('Fade transition completed!');
        addCelebrationEffects();
    }, 5500); // Wait a bit after the 5-second fade completes
}

// Add some fun celebration effects
function addCelebrationEffects() {
    // Create floating hearts or sparkles (optional enhancement)
    const colors = ['#ff69b4', '#ff1493', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingElement(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 200);
    }
}

// Create floating celebration elements
function createFloatingElement(color) {
    const element = document.createElement('div');
    element.innerHTML = '💝';
    element.style.cssText = `
        position: fixed;
        font-size: 2rem;
        color: ${color};
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: floatUp 4s ease-out forwards;
    `;
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotateZ(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotateZ(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        element.remove();
        style.remove();
    }, 4000);
}

// Handle video events (optional - for more precise timing)
function setupVideoEvents() {
    // If you need more precise control over video timing, you can use YouTube API
    // For now, we're using a simple timeout approach
    
    videoPlayer.addEventListener('load', () => {
        console.log('Video loaded');
    });
}

// Add smooth transitions for page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any ongoing animations if page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some responsive touch handling for mobile
function addTouchSupport() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Initialize touch support
document.addEventListener('DOMContentLoaded', addTouchSupport);

// Add keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    // Don't handle keys if video is visible
    if (videoIframe && videoIframe.style.visibility === 'visible') return;
    
    if (e.key === 'ArrowLeft' || e.key === 'y' || e.key === 'Y') {
        handleYesClick();
    } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        handleNoClick();
    }
});
