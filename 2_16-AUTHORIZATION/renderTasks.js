import { addTodo, deleteTodo } from "./api.js";
import { userName } from "./login-page.js";
import sanitizeHtml from "./sanitizeHTML.js";

const renderTasks = tasks => {
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
  const appElement = document.getElementById("app");
  const appHTML = `<h1>Список задач</h1>
    <ul class="tasks" id="list">${tasksHtml}
    </ul>
    <br />
    <div class="form">
    <h2 class "form-user2>Пользователь ${userName} </h2>
      <h3 class="form-title">Форма добавления</h3>
      <div class="form-row">
        Что нужно сделать:
        <input
          type="text"
          id="text-input"
          class="input"
          placeholder="Выпить кофе"
        />
      </div>
      <br />
      <button class="button" id="add-button">Добавить</button>
    </div>
`;

  appElement.innerHTML = appHTML;

  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", event => {
      event.stopPropagation();
      const id = deleteButton.dataset.id;

      deleteTodo(id).then(responseData => {
        // { result: 'ok' }
        tasks = responseData.todos;
        renderTasks(tasks);
      });

      renderTasks(tasks);
    });
  }
  const buttonElement = document.getElementById("add-button");
  const textInputElement = document.getElementById("text-input");

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
};

export default renderTasks;
