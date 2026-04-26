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

function renderTask() {
  localStorage.setItem("currentTasks", JSON.stringify(currentTasks));

  let allTasks = document.querySelector(".allTasks");
  let sum = "";

  currentTasks.forEach(function (e, idx) {
    sum += `<div class="tasks">
              <h5>${e.taskName}</h5>
              <div class="task-btns">
              <button id=${idx} class="dlt-btn"><i class="ri-delete-bin-5-line"></i></button>
              <button id=${idx} class="markDone">Mark as Done <i class="ri-check-line"></i></button></div>
            </div>`;
  });

  allTasks.innerHTML = sum;
}
renderTask();

var currentTasks = [];
if (localStorage.getItem("currentTasks")) {
  currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
} else {
  console.log("There are no tasks yet!");
}

let taskForm = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form input");
let taskDetails = document.querySelector(".addTask form textarea");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  currentTasks.push({ taskName: taskInput.value, details: taskDetails.value });

  taskInput.value = "";
  taskDetails.value = "";
  renderTask();
});

let dltBtn = document.querySelectorAll(".dlt-btn");

dltBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    console.log(btn.id);
    currentTasks.splice(btn.id, 1);
    renderTask();
  });
});
