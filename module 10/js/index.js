/*
  Написать приложение для работы с REST сервисом,
  все функции делают запрос и возвращают Promise
  с которым потом можно работать.

  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.

  - функция getUserById(id) - должна вернуть пользователя с переданным id.

  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.

  - функция removeUser(id) - должна удалять из БД юзера по указанному id.

  - функция updateUser(id, user) - должна обновлять данные пользователя по id.
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками.
  А так же панелью для вывода результатов операций с бэкендом.
*/

// GET https://test-users-api.herokuapp.com/users/
// Show your all created users. No parameters.
// GET https://test-users-api.herokuapp.com/users/:id
// Show your only one user by id. No parameters.
// POST https://test-users-api.herokuapp.com/users/
// Creating new user. Required parameters: name -> String, age -> Number;
// PUT https://test-users-api.herokuapp.com/users/:id
// Editing user by ID, sending in URL. Avialible parameters: name -> String, age -> Number
// DELETE https://test-users-api.herokuapp.com/users/:id
// Deleting user by ID, sending in URL. No parameters.

// fetch('https://test-users-api.herokuapp.com/users', {
//   method: 'POST',
//   body: JSON.stringify({ name: "NEW", age: 12}),
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   }
// });

'use strict';

const api = {
  baseUrl: 'https://test-users-api.herokuapp.com/users/',

  getUsers(id = "") {
    return fetch(`${this.baseUrl}${id}`, {
      method: 'GET',
    })
      .then(response => {
        if (response.ok) return response.json();

        throw new Error(`Error while fetching: ${response.statusText}`);
      })
      .catch(error => console.log('ERROR: ', error));
  },

  addUser(user) {
    return fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' },
    })
      .then(response => {
        if (response.ok) return response.json();

        throw new Error(`Error while fetching: ${response.statusText}`);
      })
      .catch(error => console.log('ERROR: ', error));
  },

  deleteUser(id) {
    return fetch(`${this.baseUrl}${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('It can not be removed');
      })
      .catch(error => console.log('ERROR: ', error));
  },

  updateUser(id, user) {
    return fetch(`${this.baseUrl}${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' },
    })
      .then(response => response.json())
      .catch(error => console.log('ERROR: ', error));
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const refs = selectRefs();

  refs.GetAllUsers.addEventListener('submit', handleGetAllUsers);
  refs.GetById.addEventListener('submit', handleGetById);
  refs.AddUser.addEventListener('submit', handleAddUser);
  refs.UpdateUser.addEventListener('submit', handleUpdateUser);
  refs.DeleteUser.addEventListener('submit', handleDeleteUser);

  function handleGetAllUsers(event) {
    event.preventDefault();

    api.getUsers().then(users => {
      let data = users.data;
      const markup = data.reduce(
        (acc, user) => acc + createUsersMarkup(user),
        '',
      );

      refs.reply.innerHTML = markup;
    });
  }

  function handleGetById(event) {
    event.preventDefault();
    const input = refs.GetByIdInput;

    api.getUsers(input.value).then(data => {
      const markup = createUsersMarkup(data.data);

      refs.reply.innerHTML = markup;
    });
    input.value = '';
  }

  function handleAddUser(event) {
    event.preventDefault();
    const userName = refs.AddUserInputName;
    const userAge = refs.AddUserInputAge;
    const newUser = {
      name: userName.value,
      age: userAge.value,
    };

    api.addUser(newUser).then(user => {
      console.log(user);
    });
    userName.value = '';
    userAge.value = '';
  }

  function handleUpdateUser(event) {
    event.preventDefault();

    const item = refs.UpdateUserInput;
    const nameUpdated = refs.UpdateUserName;
    const ageUpdated = refs.UpdateUserAge;
    const userToUpdate = {
      name: nameUpdated.value,
      age: ageUpdated.value,
    };

    api.updateUser(item.value, userToUpdate);
    item.value = '';
    nameUpdated.value = '';
    ageUpdated.value = '';
  }

  function handleDeleteUser(event) {
    event.preventDefault();
    const del = refs.DeleteUserInput;

    api.deleteUser(del.value).then(() => {
      console.log(`success`);
    });
    del.value = '';
  }

  function createUsersMarkup({ id, name, age }) {
    const item = `<div class="grid-item">
    ID: ${id}, Name: ${name}, Age: ${age}
    </div>`;
    return item;
  }

  function selectRefs() {
    const refs = {};

    refs.reply = document.querySelector('.reply');

    refs.GetAllUsers = document.querySelector('.js-form-get-all');

    refs.GetById = document.querySelector('.js-form-get-id');
    refs.GetByIdInput = refs.GetById.querySelector('.input-get-id');

    refs.AddUser = document.querySelector('.js-form-add');
    refs.AddUserInputName = refs.AddUser.querySelector('.input-add-name');
    refs.AddUserInputAge = refs.AddUser.querySelector('.input-add-age');

    refs.UpdateUser = document.querySelector('.js-form-update');
    refs.UpdateUserInput = document.querySelector('.input-update-id');
    refs.UpdateUserName = refs.UpdateUser.querySelector('.input-update-name');
    refs.UpdateUserAge = refs.UpdateUser.querySelector('.input-update-age');

    refs.DeleteUser = document.querySelector('.js-form-del');
    refs.DeleteUserInput = document.querySelector('.input-del-id');

    return refs;
  }
});