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

let taskForm = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form input");
let taskDetails = document.querySelector(".addTask form textarea");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
});
