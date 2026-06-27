let timerInterval = null;
let duration = 60 * 60; // 60 minutes

function startTimer(onExpire) {

    // Prevent multiple timers
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    const timerDisplay = document.getElementById("timer");

    // Restore saved time if available
    const savedTime = localStorage.getItem("mathTime");

    if (savedTime !== null) {
        duration = parseInt(savedTime, 10);
    }

    function update() {

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        // Save remaining time
        localStorage.setItem("mathTime", duration);

        if (duration <= 0) {

            clearInterval(timerInterval);

            localStorage.removeItem("mathTime");

            if (onExpire) onExpire();

            return;
        }

        duration--;
    }

    update();

    timerInterval = setInterval(update, 1000);
}

function stopTimer() {

    clearInterval(timerInterval);

    localStorage.removeItem("mathTime");
}
