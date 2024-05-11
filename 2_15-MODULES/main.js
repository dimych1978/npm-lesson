import { addTodo, getTodos } from "./api.js";
import renderTasks from "./renderTasks.js";

let tasks = [];

const buttonElement = document.getElementById("add-button");
const textInputElement = document.getElementById("text-input");

const tasksHtml = tasks
  .map(task => {
    return `
      <li class="task">
         <p class="task-text">
            ${sanitizeHtml(task.text)}
            <button data-id="${task.id}" 
            class="button delete-button">Удалить</button>
         </p>
      </li>`;
  })
  .join("");


getTodos().then(responseData => {
  tasks = responseData.todos;
  renderTasks(tasks);
});

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

addTodo(textInputElement.value)
  .then(responseData => {
    tasks = responseData.todos;
    renderTasks(tasks);
    return "Глеб";
  })
  .then(data => {
    console.log(data);
  });

  textInputElement.value = "";
});
