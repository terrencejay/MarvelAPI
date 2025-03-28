// Task 1: Countdown Timer
let timerInterval;

function startCountdown(duration) {
    let timeLeft = duration;
    const timerDisplay = document.getElementById('timer');
    
    // Clear any existing interval
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
            return;
        }
        
        // Update display
        timerDisplay.textContent = formatTime(timeLeft);
        timeLeft--;
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Task 2: Delayed Notification
function showDelayedNotification(delay, message) {
    setTimeout(() => {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }, delay);
}

// Task 3: Repeat Notification
let notificationInterval;

function startRepeatingNotification(interval, message) {
    // Clear any existing interval
    clearInterval(notificationInterval);
    
    notificationInterval = setInterval(() => {
        const notification = document.getElementById('repeating-notification');
        notification.textContent = message;
        notification.style.display = 'block';
    }, interval);
}

function stopRepeatingNotification() {
    clearInterval(notificationInterval);
    const notification = document.getElementById('repeating-notification');
    notification.style.display = 'none';
}

// HTML Event Handlers
function handleTimerSubmit(event) {
    event.preventDefault();
    const duration = parseInt(document.getElementById('duration').value);
    if (!isNaN(duration) && duration > 0) {
        startCountdown(duration);
    }
}

function handleNotificationSubmit(event) {
    event.preventDefault();
    const delay = parseInt(document.getElementById('delay').value);
    const message = document.getElementById('message').value;
    if (!isNaN(delay) && delay > 0 && message) {
        showDelayedNotification(delay, message);
    }
}

function handleRepeatingNotificationSubmit(event) {
    event.preventDefault();
    const interval = parseInt(document.getElementById('interval').value);
    const repeatMessage = document.getElementById('repeat-message').value;
    if (!isNaN(interval) && interval > 0 && repeatMessage) {
        startRepeatingNotification(interval, repeatMessage);
    }
}
