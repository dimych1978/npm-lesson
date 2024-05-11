const HOST = "https://wedev-api.sky.pro/api/v2/todos/";

export let token;

export const newToken = newToken => {
  token = newToken;
};

export const getTodos = () => {
  console.log(token);
  return fetch(HOST, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      console.log(response);
      if (response.status === 401) {
        // password = prompt("Введите верный пароль");
        // console.log(password, response);
        // getTodos();
        throw new Error("Нет авторизации");
      } else {
        console.log(response);
        return response.json();
      }
    })
    .catch(error => {
      console.warn(error);
      // getTodos();
    });
};

export const deleteTodo = id => {
  return fetch(HOST + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => {
    return response.json();
  });
};

export const addTodo = text => {
  let startAt = Date.now();
  console.log("Начинаем делать запрос");

  return fetch(HOST, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: text,
    }),
  })
    .then(response => {
      console.log("Время: " + (Date.now() - startAt));
      startAt = Date.now();
      return response;
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log("Время: " + (Date.now() - startAt));
      startAt = Date.now();
      return response;
    })
    .then(() => {
      return fetch(HOST, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then(response => {
      console.log("Время: " + (Date.now() - startAt));
      startAt = Date.now();
      return response;
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      // startAt = Date.now();

      console.log("Время: " + (Date.now() - startAt));
      return response;
    });
};

export const login = ({ login, password }) => {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  }).then(response => response.json());
};
