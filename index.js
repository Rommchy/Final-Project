//CHANGING THEMES

const moonBtn = document.querySelector(".header__svg");
const body = document.querySelector("body");
const mainHeader = document.querySelector("h1");

moonBtn.addEventListener("click", function () {
  body.classList.toggle("dark");
  mainHeader.classList.toggle("dark");
  moonBtn.classList.toggle("dark");
});

// TODO FUNCTIONALITY

const input = document.querySelector("input");
const mainDiv = document.querySelector(".main__todo-wrapper");
const mainImgWrp = document.querySelector(".main__image-wrapper");
const mainP = document.querySelector(".main__p");

const addBtn = document.querySelector(".main__button");
addBtn.addEventListener("click", function () {
  if (input.value === "") {
    return alert("You can't create empty task list!");
  }
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
    const li = document.createElement("li");
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
  summary.appendChild(ul);
  input.value = "";
});
