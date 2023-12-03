// for storing multiple timers so user can delete or add them
let timers = {};
let timerId = 1;

const timerContainer = document.getElementById("timer-container");

function addTimer() {
  // hours value
  const hours = parseInt(document.getElementById("hours").value) || 0;
  //minutes value
  const minutes = parseInt(document.getElementById("minutes").value) || 0;

  // seconds value
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  // if no input
  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please enter a valid time.");
    return;
  }

  //total time in seconds
  let totalTime = hours * 3600 + minutes * 60 + seconds;

  const timerContainer = document.querySelector("#timer-container");
  // creating a conatiner that will contain each countdown and stop timer for that countdown

  const time_box = document.createElement("div");
  time_box.className = "time_box";
  //the same id will be given to stop timer button as an attribute so that when button is clcked we can get the timer conatiner to remove it
  time_box.id = timerId;

  timerId++;

  const h3 = document.createElement("h3");
  h3.innerText = "Left Time: ";

  // conatiner that will display countdown
  const timeContainingBox = document.createElement("div");
  timeContainingBox.className = "timeCntainingBox";

  //stop button
  const stopButton = document.createElement("button");
  stopButton.innerText = "Stop Timer";

  stopButton.onclick = function () {
    stopTimer(time_box.id);
  };

  time_box.append(h3, timeContainingBox, stopButton);

  //set the countdown at 1s delay
  const countdown = setInterval(function () {
    if (totalTime > 0) {
      totalTime--;
      updateTimerDisplay(timeContainingBox, totalTime);
    } else {
      clearInterval(countdown);
      time_box.removeChild(h3);
      timeContainingBox.innerHTML = "";
      const finshedHeading = document.createElement("h2");
      finshedHeading.innerText = "Timer is up!";
      timeContainingBox.appendChild(finshedHeading);
      time_box.classList.add("timeEnd");

      stopButton.classList.add("timeEndButton");
    }
  }, 1000);

  timerContainer.appendChild(time_box);
}

// function for removing time-box element
function stopTimer(time_box_id) {
  console.log("yes");
  const time_box = document.getElementById(`${time_box_id}`);
  timerContainer.removeChild(time_box);
}

//for updating the time Box text with countdown

function updateTimerDisplay(time_box, totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}`;
  time_box.textContent = formattedTime;
}

//when time values are in single digit to convert them into double digit

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}
