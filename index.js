document.addEventListener("DOMContentLoaded", function () {
  //CHANGING THEMES

  const moonBtn = document.querySelector(".header__svg");
  const body = document.querySelector("body");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  moonBtn.addEventListener("click", function () {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else localStorage.setItem("theme", "light");
  });

  // TODO FUNCTIONALITY
  const input = document.querySelector("input");
  input.classList.add("main__input");
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

  function clickAndEnterEvent(variable, input, action) {
    variable.addEventListener("click", action);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        action();
      }
    });
  }

  // LOCAL STORAGE
  let taskLists = [];

  if (localStorage.getItem("taskLists")) {
    taskLists = JSON.parse(localStorage.getItem("taskLists"));
  }

  function saveLS() {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }

  // CREATE TASK
  function addTaskToUI(taskObj, ul) {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkBox = document.createElement("input");
    const span = document.createElement("span");
    const text = document.createElement("p");

    checkBox.type = "checkbox";
    checkBox.classList.add("main__element-checkbox");
    span.classList.add("main__element-checkmark");
    li.classList.add("main__element-li");
    label.classList.add("main__element-label");

    text.textContent = taskObj.text;

    if (taskObj.completed) text.classList.add("checked");
    checkBox.checked = taskObj.completed;

    checkBox.addEventListener("change", () => {
      taskObj.completed = checkBox.checked;
      text.classList.toggle("checked");
      saveLS();
    });

    label.append(checkBox, span, text);
    li.append(label);
    ul.append(li);
  }

  // CREATE LIST
  function renderTaskList(listObj, isNew = false) {
    const div = document.createElement("div");
    div.classList.add("main__todo-element-wrapper");

    const details = document.createElement("details");
    details.classList.add("main__todo-element");

    const summary = document.createElement("summary");
    summary.textContent = listObj.title;

    const ul = document.createElement("ul");

    const addIcon = document.createElement("img");
    addIcon.classList.add("main__add-icon");
    addIcon.src = "img/plus-icon.png";

    const createdInput = document.createElement("input");
    createdInput.classList.add("main__created-input");
    createdInput.name = "createdInput";
    createdInput.placeholder = "Type your new task here...";

    const basketIcon = document.createElement("img");
    basketIcon.classList.add("main__basket-icon");
    basketIcon.src = "img/basket-icon.png";

    // DELETE LIST
    basketIcon.addEventListener("click", function () {
      if (confirm("You sure you want to delete this task list?")) {
        taskLists = taskLists.filter((l) => l !== listObj);
        saveLS();
        div.remove();
        if (taskLists.length === 0) {
          mainDiv.classList.remove("active");
          mainImgWrp.classList.remove("hide");
          mainP.classList.remove("hide");
        }
      }
    });

    // ADD TASK
    function addTaskRecord() {
      if (checkIfEmpty(createdInput, "You can't create an empty task!")) return;

      const taskObj = {
        text: createdInput.value,
        completed: false,
      };

      listObj.tasks.push(taskObj);
      saveLS();

      addTaskToUI(taskObj, ul);
      createdInput.value = "";
    }

    clickAndEnterEvent(addIcon, createdInput, addTaskRecord);

    details.appendChild(summary);
    details.appendChild(createdInput);
    details.appendChild(ul);

    div.appendChild(details);
    div.appendChild(addIcon);
    div.appendChild(basketIcon);

    mainDiv.classList.add("active");
    mainImgWrp.classList.add("hide");
    mainP.classList.add("hide");

    mainDiv.appendChild(div);

    // LOAD EXISTING TASKS
    listObj.tasks.forEach((task) => addTaskToUI(task, ul));

    if (isNew) {
      taskLists.push(listObj);
      saveLS();
    }
  }

  // ADD NEW LIST
  function addTaskListRecord() {
    if (checkIfEmpty(input, "You can't create empty task list!")) return;

    const listObj = {
      title: input.value,
      tasks: [],
    };

    renderTaskList(listObj, true);

    input.value = "";
  }

  clickAndEnterEvent(addBtn, input, addTaskListRecord);

  // LOAD TASK LISTS
  taskLists.forEach((listObj) => renderTaskList(listObj, false));

  //COPY YEAR
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const footerP = document.querySelector(".footer__copy");
  footerP.innerHTML = `<span>&copy;</span> ${currentYear} Rommchy`;
});
