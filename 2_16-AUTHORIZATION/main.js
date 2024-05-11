import { loginRender } from "./login-page.js";
import { getTodos } from "./api.js";
import renderTasks from "./renderTasks.js";

let tasks = [];

const fetchAndRender = () => {
  getTodos()
    .then(responseData => {
      console.log(responseData);
      if (!responseData) throw new Error("Нет данных");
      tasks = responseData.todos;
      console.log(tasks);
      renderTasks(tasks);
    })
    .catch(error => console.warn(error));
};

loginRender({fetchAndRender});
