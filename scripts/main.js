document.addEventListener("DOMContentLoaded", function () {
  // функция загрузки header
  fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    });

  // функция загрузки footer
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
});

// фильтрация

const urlArray =
  "https://files.slack.com/files-pri/T05P497HJ3A-F07CZ4Q743Y/events.mock.json";

const categoryBtn = document.querySelector("#categoryBtn");
const selectCategory = document.querySelector(".category");

const distanceBtn = document.querySelector("#distanceBtn");
const selectDistance = document.querySelector(".distance");

const typeBtn = document.querySelector("#typeBtn");

categoryBtn.addEventListener("click", () => {
  const ul = document.createElement("ul");
  ul.classList.add("listContainer");
  ul.textContent = "This is a new ul element";
  selectCategory.append("ul");

  // console.log("Element 'ul' added:", ul); // Логируем добавленный элемент
  // console.log("Current state of selectCategory:", selectCategory.innerHTML);
});

//   Category:
// ● Social Activities
// ● Hobbies and Passions
// ● Health and Wellbeing
// ● Business
// ● Technology
