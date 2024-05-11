import { login, newToken } from "./api.js";

export let userName;

export const loginRender = ({ fetchAndRender }) => {
  const appElement = document.getElementById("app");
  const loginHTML = `    <h1>Страница входа</h1>
    <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <input type="text" class="input" id="login-input" placeholder="Логин" />
      <input
        type="text"
        class="input"
        id="password-input"
        placeholder="Пароль"
      />
      <br />
      <button class="button" id="input-button">Войти</button>
      <a href="index.html" id="input-link">Перейти на стартовую страницу</a>
    </div>`;
  appElement.innerHTML = loginHTML;

  const buttonLogin = document.getElementById("input-button");
  const loginElement = document.getElementById("login-input");
  const passwordElement = document.getElementById("password-input");

  buttonLogin.addEventListener("click", () => {
    login({ login: loginElement.value, password: passwordElement.value })
      .then(response => {
        if (response.status === 400) {
          throw new Error("Данные введены неверно");
        }
        console.log(response);
        newToken(response.user.token);
        console.log(response.user.name);
        userName = response.user.name;
      })
      .then(() => fetchAndRender())
      .catch(error => console.warn(error));
  });
};
