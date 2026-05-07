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
