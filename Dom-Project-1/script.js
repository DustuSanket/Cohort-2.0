// https://in.pinterest.com/pin/71987294040806481
const wKey = "a037f59192aa471d86f50952261005";

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

function timeWeatherWidget() {
  const temperature = document.querySelector(".head-2 h2");
  const wCondition = document.querySelector(".head-2 h4");
  const wind = document.querySelector(".head-2 .wind");
  const pressure = document.querySelector(".head-2 .pressure");
  const humidity = document.querySelector(".head-2 .humidity");
  const clock = document.querySelector(".head-1 h1");
  const dateClock = document.querySelector(".head-1 h2");

  async function weatherFetch() {
    let response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${wKey}&q=auto:ip`,
    );
    let wData = await response.json();
    temperature.innerHTML = `${Math.floor(wData.current.temp_c)}°C`;
    wCondition.innerHTML = `${wData.current.condition.text}`;
    wind.innerHTML = `Wind: ${wData.current.wind_kph} km/h`;
    humidity.innerHTML = `Humidity: ${wData.current.humidity}%`;
    pressure.innerHTML = `Pressure: ${wData.current.pressure_mb} mb`;
  }
  weatherFetch();
  setInterval(
    () => {
      weatherFetch();
    },
    5 * 60 * 1000,
  );

  function dateTime() {
    const allDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date();
    let day = date.getDate();
    let month = allMonths[date.getMonth()];
    let year = date.getFullYear();
    let today = allDays[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    dateClock.innerHTML = `${month} ${day}, ${year}`;
    clock.innerHTML = `${today},${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  setInterval(() => {
    dateTime();
  }, 1000);

  const wRefreshBtn = document.querySelector(".head-1 #weather-refresh");

  wRefreshBtn.addEventListener("click", () => {
    weatherFetch();
    console.log("Fetching Weather...");
  });
}
timeWeatherWidget();
