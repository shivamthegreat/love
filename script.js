let noClickCount = 0;
let hasClickedYes = false;
const messageEl = document.getElementById('message');
const counterEl = document.getElementById('counter');
const noCountEl = document.getElementById('no-count');
const noButton = document.getElementById('no-button');
const yesButton = document.getElementById('yes-button');
const resetButton = document.getElementById('reset-button');

// Messages for when user tries to click "NO"
const noMessages = [
    "Are you sure about that? 🤔",
    "Think again! 💭",
    "Really? Give it another thought... 😏",
    "I don't believe you! 😤",
    "Your heart says otherwise! 💓",
    "Stop playing hard to get! 😜",
    "I know you love me deep down! 💕",
    "Resistance is futile! 🥰",
    "Just admit it already! 😍",
    "You can't escape love! 💘"
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create some initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 1000);
    }
    
    // Start creating hearts continuously
    setInterval(createHeart, 800);
});

// Create floating hearts background
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 6 + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    const heartsContainer = document.querySelector('.hearts');
    if (heartsContainer) {
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 6000);
    }
}

function clickYesButton() {
    if (hasClickedYes) return;
    
    hasClickedYes = true;
    messageEl.innerHTML = '🎉 I KNEW IT! You love me too! 💕✨';
    messageEl.className = 'message love-message';
    
    // Hide NO button and show reset
    noButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    
    // Create celebration effect
    createCelebration();
    
    // Make YES button bigger
    yesButton.style.transform = 'scale(1.2)';
    yesButton.innerHTML = 'YES! 💖💖💖';
}

function hoverNoButton() {
    if (hasClickedYes) return;
    
    noClickCount++;
    noCountEl.textContent = noClickCount;
    counterEl.style.display = 'block';
    
    // Move the NO button to a random position
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width - 40;
    const maxY = containerRect.height - buttonRect.height - 40;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noButton.style.position = 'absolute';
    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';
    
    // Show message
    const randomMessage = noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];
    messageEl.innerHTML = randomMessage;
    messageEl.className = 'message try-again-message';
    
    // Make YES button more attractive
    yesButton.style.transform = `scale(${1 + (noClickCount * 0.1)})`;
    if (noClickCount > 5) {
        yesButton.innerHTML = 'YES! (Please click me! 🥺)';
    }
    
    // Add shake effect to NO button
    noButton.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        noButton.style.animation = '';
    }, 500);
}

function clickNoButton() {
    // This function runs if they somehow manage to click the NO button
    hoverNoButton();
    
    // Extra punishment for actually clicking
    noClickCount += 2;
    const messageEl = document.getElementById('message');
    messageEl.innerHTML = "Did you just CLICK the NO button?! 😱 That's it, I'm making this harder!";
    
    // Make the button even more elusive
    const button = document.getElementById('no-button');
    button.style.transform = 'scale(0.8)'; // Make it smaller
    button.innerHTML = 'NO (Good luck!)';
}

function createCelebration() {
    const celebration = document.getElementById('celebration');
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];
    
    // Create confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            
            celebration.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 6000);
        }, i * 100);
    }
}

function resetGame() {
    hasClickedYes = false;
    noClickCount = 0;
    
    // Reset message
    const messageEl = document.getElementById('message');
    messageEl.style.display = 'none';
    
    // Reset counter
    document.getElementById('counter').style.display = 'none';
    document.getElementById('no-count').textContent = '0';
    
    // Reset NO button
    const noButton = document.getElementById('no-button');
    noButton.style.display = 'inline-block';
    noButton.style.left = '650px';
    noButton.style.top = '300px';
    noButton.innerHTML = 'NO';
    noButton.style.transform = 'scale(1)';
    noButton.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
    
    // Reset YES button
    const yesButton = document.getElementById('yes-button');
    yesButton.style.transform = 'scale(1)';
    yesButton.innerHTML = 'YES! 💕';
    yesButton.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
    
    // Hide reset button
    document.getElementById('reset-button').style.display = 'none';
    
    // Clear celebration
    const celebration = document.getElementById('celebration');
    if (celebration) {
        celebration.innerHTML = '';
    }
}

// Keyboard support
function handleKeyPress(event) {
    if (event.key.toLowerCase() === 'y') {
        clickYesButton();
    } else if (event.key.toLowerCase() === 'n') {
        hoverNoButton();
    } else if (event.key.toLowerCase() === 'r' && hasClickedYes) {
        resetGame();
    }
}

// Add some fun sound effects (if you want to add audio files)
function playSound(soundName) {
    // You can add audio files and uncomment this
    // const audio = new Audio(`/sounds/${soundName}.mp3`);
    // audio.play().catch(e => console.log('Sound not available'));
}

// Make the page more interactive with mouse movements
document.addEventListener('mousemove', function(e) {
    if (noClickCount > 15) {
        // After many attempts, make the YES button follow the mouse slightly
        const yesButton = document.getElementById('yes-button');
        if (yesButton && !hasClickedYes) {
            const rect = yesButton.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.1;
            const deltaY = (e.clientY - centerY) * 0.1;
            
            yesButton.style.transform += ` translate(${deltaX}px, ${deltaY}px)`;
        }
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s';
        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
        }, 2000);
        
        const messageEl = document.getElementById('message');
        messageEl.innerHTML = '🎮 Konami Code activated! You\'re a legend! 🎮';
        messageEl.style.display = 'block';
        konamiCode = []; // Reset
    }
});
