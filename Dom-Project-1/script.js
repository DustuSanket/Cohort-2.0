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
  let allTasks = document.querySelector(".allTasks");
  let sum = "";

  currentTasks.forEach(function (e) {
    sum += `<div class="tasks">
              <h5>${e.taskName}</h5>
              <button>Mark as Done <i class="ri-check-line"></i></button>
            </div>`;
  });

  allTasks.innerHTML = sum;
}

let currentTasks = [
  {
    taskName: "Hagne jao",
    details: "zada se zada",
  },
  {
    taskName: "Khana Khao",
    details: "Roti chicken",
  },
  {
    taskName: "Video dekho",
    details: "Sheyrians ka",
  },
];

renderTask();

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
