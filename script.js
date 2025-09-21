// Application state
let currentQuestion = 1;
const totalQuestions = 5;

// YouTube video URL - using a test video that allows embedding
// Replace with your chosen video URL
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&rel=0";

// DOM elements
const questionScreens = document.querySelectorAll('.question-screen');
const yesButton = document.getElementById('yes-btn');
const noButton = document.getElementById('no-btn');
const disbeliefModal = document.getElementById('disbelief-modal');
const videoContainer = document.getElementById('video-container');
const videoPlayer = document.getElementById('video-player');
const surpriseOverlay = document.getElementById('surprise-overlay');
const buttonsContainer = document.querySelector('.buttons-container');

// Initialize the application
function init() {
    yesButton.addEventListener('click', handleYesClick);
    noButton.addEventListener('click', handleNoClick);
    
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
    // Hide questions and buttons
    document.querySelector('.container').style.display = 'none';
    
    // Show video container first
    videoContainer.classList.add('active');
    videoContainer.style.display = 'block';
    
    // Add a test div to confirm container is working
    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
        position: absolute;
        top: 20px;
        left: 20px;
        background: red;
        color: white;
        padding: 10px;
        z-index: 2000;
        font-size: 16px;
    `;
    testDiv.textContent = 'Video container is active - iframe should be visible below this';
    videoContainer.appendChild(testDiv);
    
    // Remove test div after 3 seconds
    setTimeout(() => {
        testDiv.remove();
    }, 3000);
    
    // Ensure iframe is visible and properly sized
    videoPlayer.style.display = 'block';
    videoPlayer.style.width = '100%';
    videoPlayer.style.height = '100%';
    videoPlayer.style.position = 'absolute';
    videoPlayer.style.top = '0';
    videoPlayer.style.left = '0';
    videoPlayer.style.background = '#000';
    videoPlayer.style.zIndex = '1001';
    
    // Set video source after container is visible
    setTimeout(() => {
        videoPlayer.src = YOUTUBE_VIDEO_URL;
        console.log('Video URL set:', YOUTUBE_VIDEO_URL);
        console.log('Video container displayed:', window.getComputedStyle(videoContainer).display);
        console.log('Video iframe displayed:', window.getComputedStyle(videoPlayer).display);
        
        // Show fallback initially
        const fallbackContent = document.getElementById('fallback-content');
        fallbackContent.style.display = 'block';
        
        // Add error handling for iframe loading
        videoPlayer.onload = () => {
            console.log('Video iframe loaded successfully');
            fallbackContent.style.display = 'none';
        };
        
        videoPlayer.onerror = () => {
            console.error('Video iframe failed to load');
            fallbackContent.innerHTML = '<h2>Video failed to load</h2><p>There was an error loading the video content.</p>';
        };
        
        // Hide fallback after 5 seconds if iframe loads
        setTimeout(() => {
            fallbackContent.style.display = 'none';
        }, 5000);
        
        // Double-check visibility after a moment
        setTimeout(() => {
            const rect = videoPlayer.getBoundingClientRect();
            console.log('Video iframe position:', rect);
            console.log('Video iframe computed styles:', {
                display: window.getComputedStyle(videoPlayer).display,
                visibility: window.getComputedStyle(videoPlayer).visibility,
                opacity: window.getComputedStyle(videoPlayer).opacity,
                zIndex: window.getComputedStyle(videoPlayer).zIndex
            });
        }, 1000);
    }, 100);
    
    // Start the surprise reveal countdown
    startSurpriseCountdown();
}

// Start countdown for surprise reveal (placeholder video is about 3 minutes - adjust as needed)
function startSurpriseCountdown() {
    // Adjust this timing based on your actual video length
    // Placeholder video is about 3 minutes, start fading at 2:50
    const videoLength = 180000; // 3 minutes in milliseconds
    const fadeStartTime = videoLength - 10000; // Start fade 10 seconds before end
    
    setTimeout(() => {
        revealSurprise();
    }, fadeStartTime);
}

// Reveal the surprise image with fade
function revealSurprise() {
    surpriseOverlay.classList.add('show');
    
    // Optional: Add some celebration effects
    setTimeout(() => {
        addCelebrationEffects();
    }, 5000);
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
    if (videoContainer.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft' || e.key === 'y' || e.key === 'Y') {
        handleYesClick();
    } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        handleNoClick();
    }
});
