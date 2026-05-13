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
    updateWeatherBackground(
      wData.current.condition.text,
      new Date().getHours(),
    );
  }
  weatherFetch();
  setInterval(
    () => {
      weatherFetch();
    },
    5 * 60 * 1000,
  );

  function updateWeatherBackground(weatherCondition, currentHour) {
    const header = document.querySelector("header");
    let imageUrl = "";

    const condition = weatherCondition.toLowerCase();

    // The Time Matrix
    const isLateNight = currentHour >= 0 && currentHour < 5;
    const isDawn = currentHour >= 5 && currentHour < 8;
    const isMorning = currentHour >= 8 && currentHour < 12;
    const isNoon = currentHour >= 12 && currentHour < 15;
    const isAfternoon = currentHour >= 15 && currentHour < 18;
    const isEvening = currentHour >= 18 && currentHour < 20;
    const isNight = currentHour >= 20 && currentHour <= 23;

    // 1. CLEAR & SUNNY (Pure Sky)
    if (condition.includes("clear") || condition.includes("sunny")) {
      if (isDawn) {
        imageUrl =
          "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1600&auto=format&fit=crop"; // Pink/Purple Dawn
      } else if (isMorning || isNoon) {
        imageUrl =
          "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1600&auto=format&fit=crop"; // Bright blue sky
      } else if (isAfternoon) {
        imageUrl =
          "https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=1600&auto=format&fit=crop"; // Golden afternoon sky
      } else if (isEvening) {
        imageUrl =
          "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=1600&auto=format&fit=crop"; // Vibrant Sunset
      } else if (isNight) {
        imageUrl =
          "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1600&auto=format&fit=crop"; // Moon & Stars
      } else if (isLateNight) {
        imageUrl =
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop"; // Deep Milky Way
      }
    }
    // 2. CLOUDY & OVERCAST
    else if (condition.includes("cloud") || condition.includes("overcast")) {
      if (isDawn || isEvening) {
        imageUrl =
          "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044e?q=80&w=1600&auto=format&fit=crop"; // Moody sunset clouds
      } else if (isMorning || isNoon || isAfternoon) {
        imageUrl =
          "https://images.unsplash.com/photo-1469365556835-3da3db4c253b?q=80&w=1600&auto=format&fit=crop"; // Fluffy white clouds
      } else {
        imageUrl =
          "https://images.unsplash.com/photo-1536514072410-5019a3c693cb?q=80&w=1600&auto=format&fit=crop"; // Dark night clouds
      }
    }
    // 3. RAIN & SHOWERS
    else if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("shower")
    ) {
      if (isNight || isLateNight) {
        imageUrl =
          "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1600&auto=format&fit=crop"; // Dark rain
      } else {
        imageUrl =
          "https://images.unsplash.com/photo-1518803194621-27188ba362c9?q=80&w=1600&auto=format&fit=crop"; // Grey stormy day
      }
    }
    // 4. MIST, FOG & HAZE
    else if (
      condition.includes("mist") ||
      condition.includes("fog") ||
      condition.includes("haze")
    ) {
      imageUrl =
        "https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1600&auto=format&fit=crop"; // Thick grey mist
    }
    // 5. SNOW & ICE
    else if (
      condition.includes("snow") ||
      condition.includes("ice") ||
      condition.includes("blizzard")
    ) {
      if (isNight || isLateNight) {
        imageUrl =
          "https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=1600&auto=format&fit=crop"; // Dark snowy night
      } else {
        imageUrl =
          "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=1600&auto=format&fit=crop"; // Bright snowy sky
      }
    }
    // 6. THUNDERSTORM
    else if (condition.includes("thunder")) {
      imageUrl =
        "https://images.unsplash.com/photo-1605727216801-e27ce1d0ce16?q=80&w=1600&auto=format&fit=crop"; // Purple lightning
    }
    // DEFAULT FALLBACK
    else {
      imageUrl =
        "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=1600&auto=format&fit=crop";
    }

    header.style.backgroundImage = `url('${imageUrl}')`;
  }
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

  const wRefreshBtn = document.querySelector("header #weather-refresh");

  if (wRefreshBtn) {
    wRefreshBtn.addEventListener("click", () => {
      weatherFetch();
      console.log("Fetching Weather...");
    });
  }
}
timeWeatherWidget();

function initializeThemes() {
  const body = document.body;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const paletteBtn = document.getElementById("palette-btn");

  const themes = ["minimal", "ocean", "matcha", "lavender"];

  const savedMode = localStorage.getItem("darkMode");
  let currentThemeIndex = parseInt(localStorage.getItem("themeIndex")) || 0;

  body.setAttribute("data-theme", themes[currentThemeIndex]);

  if (savedMode === "true") {
    body.classList.add("dark-mode");
    themeToggleBtn.innerHTML = '<i class="ri-sun-line"></i>';
  } else {
    themeToggleBtn.innerHTML = '<i class="ri-moon-line"></i>';
  }

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Switch the icon and save to local storage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "true");
      themeToggleBtn.innerHTML = '<i class="ri-sun-line"></i>';
    } else {
      localStorage.setItem("darkMode", "false");
      themeToggleBtn.innerHTML = '<i class="ri-moon-line"></i>';
    }
  });

  // 2. Cycle Palettes Button
  paletteBtn.addEventListener("click", () => {
    // Add a tiny spin animation to the palette icon for satisfying feedback
    const icon = paletteBtn.querySelector("i");
    icon.style.transform = "rotate(180deg)";
    setTimeout(() => {
      icon.style.transform = "rotate(0deg)";
    }, 300);

    // Move to the next theme in the array (and loop back to 0 at the end)
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];

    // Apply the new theme and save it
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("themeIndex", currentThemeIndex.toString());
  });
}
initializeThemes();
