let time = 1500; // default to 25 min
let timerInterval;
let isRunning = false;
const timerDisplay = document.getElementById("timer");
const alarm = document.getElementById("alarm");

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs > 0 ? String(hrs).padStart(2, '0') + ':' : ''}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(time);
}

function setMode(mode) {
  stopTimer();
  if (mode === "pomodoro") time = 25 * 60;
  if (mode === "short") time = 5 * 60;
  if (mode === "long") time = 15 * 60;
  updateDisplay();
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        alarm.play();
        isRunning = false;
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  updateDisplay();
}

function resetTimer() {
  stopTimer();
  setMode("pomodoro");
}
updateDisplay();
