/*
  Есть массив logins с логинами пользователей. Напишите скрипт добавления логина в массив logins.

  Добавляемый логин должен:
    - проходить проверку на длину, от 4 до 16-ти символов включительно
    - быть уникален, тоесть еще не используется в массиве logins

  🔔 Разбейте задачу на подзадачи, что удобно решить используя функции.

  Для начала напишите функцию checkLoginValidity(login) которая получает логин как
  аргумент, проверяет количество символов логина и возвращает true если логин подходит
  под условие длины от 4-х до 16-ти символов включительно, и false если не подходит.
  Убедитесь что функция работает верно.

  Далее создайте функцию checkIfLoginExists(logins, login), которая получает логин и список
  всех логинов как аргументы, проверяет наличие логина в массиве logins, возвращая false
  если такого логина в массиве еще нет, и true если есть. Убедитесь что функция работает верно.
  Далее напишите функцию addLogin(logins, login) которая:
    - Получает новый логин и массив всех логинов как аргументы

    - Проверяет валидность логина используя вспомогательную функцию checkLoginValidity

    - Если логин не валиден, прекратить исполнение функции addLogin
      и вернуть строку 'Ошибка! Логин должен быть от 4 до 16 символов'

    - Если логин валиден, функция addLogin проверяеть уникальность логина
      с помощью функции checkIfLoginExists

    - Если checkIfLoginExists вернет false, addLogin добавляет новый логин
       в logins и возвращает строку 'Логин успешно добавлен!'

    - Если checkIfLoginExists вернет true, тогда addLogin не добавляет
       логин в массив и возвращает строку 'Такой логин уже используется!'

  🔔 Принцип единственной ответственности функции:
      - checkIfLoginExists только проверяет есть ли такой логин и возвращает true или false.
        Больше ничего не делает.

      - checkLoginValidity только проверяет  валидный ли логин и возвращает true или false.
        Больше ничего не делает.

      - addLogin вызывает обе функции и по результату их работы или добавляет логин в logins или нет,
        возвращая указанные строки. Больше ничего не делает.
*/

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

let login = prompt('Введите ваш логин');

// function checkLoginValidity(login) {
//   if(login.length >= 4 && login.length <= 16) {
//     return true;
//   }
//   return false;
// }

const checkLoginValidity = login => login.length >= 4 && login.length <= 16;

// function checkIfLoginExists(logins, login) {
//   return logins.includes(login);
// }

const checkIfLoginExists = (logins, login) => logins.includes(login);

// function addLogin(logins, login) {
//   if ( !checkLoginValidity(login) ) {
//     alert ('Ошибка! Логин должен быть от 4 до 16 символов')
//   } else if ( checkIfLoginExists(logins, login) ) {
//     alert('Такой логин уже используется!');
//   } else {
//     logins.push(login);
//     alert("Логин успешно добавлен!")
//   }
// }

const addLogin = (logins, login) =>
  !checkLoginValidity(login)
    ? alert('Ошибка! Логин должен быть от 4 до 16 символов')
    : checkIfLoginExists(logins, login)
      ? alert('Такой логин уже используется!')
      : logins.push(login) && alert('Логин успешно добавлен!');

addLogin(logins, login);

console.log(logins);
