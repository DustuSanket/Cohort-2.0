// https://in.pinterest.com/pin/71987294040806481/

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
