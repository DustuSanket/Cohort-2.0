// https://in.pinterest.com/pin/71987294040806481/

function openContainer() {
  const allElems = document.querySelectorAll(".elems");
  const returnBtn = document.querySelectorAll(".return");
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      document.querySelectorAll(".tabs")[elem.id].style.display = "block";
    });
  });
  returnBtn.forEach(function (elem) {
    elem.addEventListener("click", function () {
      document.querySelectorAll(".tabs")[elem.id].style.display = "none";
    });
  });
}
openContainer();

function toDoList() {
  let currentTasks = [];
  function renderTask() {
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));

    let allTasks = document.querySelector(".allTasks");
    let sum = "";

    currentTasks.forEach(function (e, idx) {
      let taskClass = e.completed ? "tasks task-completed" : "tasks";
      let btnText = e.completed
        ? "Completed"
        : 'Mark as Done <i class="ri-check-line"></i>';
      let btnDisabled = e.completed ? "disabled" : "";

      sum += `<div class="${taskClass}">
              <h5>${e.taskName}</h5>
              <div class="task-btns">
              <button id=${idx} class="dlt-btn"><i class="ri-delete-bin-5-line"></i></button>
              <button id=${idx} class="markDone" ${btnDisabled}>${btnText}</button></div>
            </div>`;
    });

    allTasks.innerHTML = sum;
    bindBtns();
  }
  function bindBtns() {
    let dltBtn = document.querySelectorAll(".dlt-btn");
    dltBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTasks.splice(btn.id, 1);
        renderTask();
      });
    });

    let markDone = document.querySelectorAll(".markDone");
    markDone.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTasks[btn.id].completed = true;
        renderTask();
      });
    });
  }

  if (localStorage.getItem("currentTasks")) {
    currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
  } else {
    console.log("There are no tasks yet!");
  }
  renderTask();

  let taskForm = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form input");
  let taskDetails = document.querySelector(".addTask form textarea");

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (taskInput.value.trim() === "") return;

    currentTasks.push({
      taskName: taskInput.value,
      details: taskDetails.value,
      completed: false,
    });

    taskInput.value = "";
    taskDetails.value = "";
    renderTask();
  });
}
toDoList();

function dailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let hours = Array.from({ length: 18 }, (elem, idx) => {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });

  let dayPlan = document.querySelector(".dayPlan");
  let daySum = "";

  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || "";
    daySum += `<div class="dpTime">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value="${savedData}" />
  </div>`;
  });
  dayPlan.innerHTML = daySum;

  let dpTimeInput = document.querySelectorAll(".dpTime input");
  dpTimeInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function dailyQuotes() {
  let quoteText = document.querySelector(".quote-text");
  let quoteAuthor = document.querySelector(".quote-author");
  async function quoteFetch() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let quotesData = await response.json();

    quoteText.innerHTML = quotesData.quote;
    quoteAuthor.innerHTML = quotesData.author;
  }
  quoteFetch();
}
dailyQuotes();

function pomodoroTimer() {
  let totalSeconds = 25 * 60;

  let timer = document.querySelector(".pomodoro-timer #time");
  let headingTxt = document.querySelector(".pomodoro-timer #heading");
  let startTimer = document.querySelector(".pomodoro-timer .start-timer");
  let pauseTimer = document.querySelector(".pomodoro-timer .pause-timer");
  let resetTimer = document.querySelector(".pomodoro-timer .reset-timer");

  let timerInterval = null;
  let isWorking = true;
  let isRunning = false;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  updateTimer();

  startTimer.addEventListener("click", function () {
    if (isRunning) return;

    isRunning = true;

    startTimer.style.opacity = "0.6";
    startTimer.style.pointerEvents = "none";

    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        isRunning = false;

        startTimer.innerHTML = "Start";
        startTimer.style.opacity = "1";
        startTimer.style.pointerEvents = "auto";

        setTimeout(() => {
          if (isWorking) {
            isWorking = false;
            totalSeconds = 5 * 60;
            headingTxt.innerHTML = "Break Time!";
          } else {
            isWorking = true;
            totalSeconds = 25 * 60;
            headingTxt.innerHTML = "Start Working!";
          }

          updateTimer();
        }, 300);
      }
    }, 1000);
  });

  pauseTimer.addEventListener("click", function () {
    if (!isRunning) return;

    clearInterval(timerInterval);
    isRunning = false;

    startTimer.innerHTML = "Resume";
    startTimer.style.opacity = "1";
    startTimer.style.pointerEvents = "auto";
  });

  resetTimer.addEventListener("click", function () {
    clearInterval(timerInterval);

    isRunning = false;
    isWorking = true;
    totalSeconds = 25 * 60;

    updateTimer();
    headingTxt.innerHTML = "Start Working!";
    startTimer.innerHTML = "Start";
    startTimer.style.opacity = "1";
    startTimer.style.pointerEvents = "auto";
  });
}
pomodoroTimer();
