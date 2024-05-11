export const getTodos = () => {
  return fetch("https://webdev-hw-api.vercel.app/api/todos", {
    method: "GET",
  }).then(response => {
    return response.json();
  });
};

export const deleteTodo = id => {
  return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
    method: "DELETE",
  }).then(response => {
    return response.json();
  });
};

export const addTodo = (text) => {
  let startAt = Date.now();
  console.log("Начинаем делать запрос");


    return fetch("https://webdev-hw-api.vercel.app/api/todos", {
      method: "POST",
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
        return fetch("https://webdev-hw-api.vercel.app/api/todos", {
          method: "GET",
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
      })
}
