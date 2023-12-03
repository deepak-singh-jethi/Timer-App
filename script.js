let timers = {};
let timerId = 1;

const timerContainer = document.getElementById("timer-container");
const audioFileInput = document.getElementById("audioFile");
const timerSound = new Audio("./mixkit-classic-alarm-995.wav");

function addTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please enter a valid time.");
    return;
  }

  let totalTime = hours * 3600 + minutes * 60 + seconds;

  const time_box = document.createElement("div");
  time_box.className = "time_box";
  time_box.id = timerId++;

  const h3 = document.createElement("h3");
  h3.innerText = "Left Time: ";

  const timeContainingBox = document.createElement("div");
  timeContainingBox.className = "timeCntainingBox";

  const stopButton = document.createElement("button");
  stopButton.innerText = "Stop Timer";

  stopButton.onclick = function () {
    stopTimer(time_box.id);
  };

  time_box.append(h3, timeContainingBox, stopButton);

  const countdown = setInterval(function () {
    if (totalTime > 0) {
      totalTime--;
      updateTimerDisplay(timeContainingBox, totalTime);
    } else {
      clearInterval(countdown);
      time_box.removeChild(h3);
      timeContainingBox.innerHTML = "";

      // Play the sound when the timer ends
      timerSound.currentTime = 0;
      timerSound.play();

      const finishedHeading = document.createElement("h2");
      finishedHeading.innerText = "Timer is up!";
      timeContainingBox.appendChild(finishedHeading);
      time_box.classList.add("timeEnd");

      stopButton.classList.add("timeEndButton");
    }
  }, 1000);

  timerContainer.appendChild(time_box);
}

function stopTimer(time_box_id) {
  const time_box = document.getElementById(`${time_box_id}`);
  timerContainer.removeChild(time_box);

  timerSound.pause();
  timerSound.currentTime = 0;
}

function updateTimerDisplay(time_box, totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}`;
  time_box.textContent = formattedTime;
}

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}
