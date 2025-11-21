//CHANGING THEMES

const moonBtn = document.querySelector(".header__svg");
const body = document.querySelector("body");

moonBtn.addEventListener("click", function () {
  body.classList.toggle("dark");
});

// TODO FUNCTIONALITY

const input = document.querySelector("input");
const mainDiv = document.querySelector(".main__todo-wrapper");
const mainImgWrp = document.querySelector(".main__image-wrapper");
const mainP = document.querySelector(".main__p");

const addBtn = document.querySelector(".main__button");

function checkIfEmpty(variable, message) {
  if (variable.value.trim() === "") {
    alert(message);
    return true;
  }
  return false;
}

function addTaskRecord() {
  if (checkIfEmpty(input, "You can't create empty task list!")) return;

  const div = document.createElement("div");
  div.classList.add("main__todo-element-wrapper");
  const details = document.createElement("details");
  details.classList.add("main__todo-element");

  const summary = document.createElement("summary");
  const ul = document.createElement("ul");

  mainDiv.classList.add("active");
  mainImgWrp.classList.add("hide");
  mainP.classList.add("hide");

  const addIcon = document.createElement("img");
  addIcon.classList.add("main__add-icon");
  addIcon.src = "img/plus-icon.png";
  addIcon.addEventListener("click", function () {
    if (checkIfEmpty(createdInput, "You can't create an empty task!")) return;
    const li = document.createElement("li");
    li.textContent = `${createdInput.value}`;
    ul.appendChild(li);
  });

  const basketIcon = document.createElement("img");
  basketIcon.classList.add("main__basket-icon");
  basketIcon.src = "img/basket-icon.png";
  basketIcon.addEventListener("click", function () {
    div.remove();
  });

  summary.textContent = input.value;
  mainDiv.appendChild(div);
  div.appendChild(details);
  div.appendChild(addIcon);
  div.appendChild(basketIcon);
  details.appendChild(summary);
  details.appendChild(ul);
  const createdInput = document.createElement("input");
  createdInput.placeholder = "Type your task here...";
  details.appendChild(createdInput);
  input.value = "";
}

addBtn.addEventListener("click", addTaskRecord);

input.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key === "Enter") {
    addTaskRecord();
  }
});

//COPY YEAR
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const footerP = document.querySelector(".footer__copy");
footerP.innerHTML = `<span>&copy;</span> ${currentYear} Rommchy`;
