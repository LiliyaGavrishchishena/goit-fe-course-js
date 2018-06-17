/*
  Написать следующий скрипт:

    - При загрузке страницы пользователю предлагается ввести через prompt число.
      Число введенное пользователем записывается в массив чисел.

    - Операция ввода числа пользователем и сохранение в массив продолжается до
      тех пор, пока пользователь не нажмет Cancel в prompt. Используйте цикл do...while.

    - После того как пользователь прекратил ввод нажав Cancel, необходимо взять
      массив введенных чисел, сложить общую сумму всех элементов массива и
      записать ее в переменную. Используйте цикл for...of.

    - По окончанию ввода, если массив не пустой, вывести alert с текстом `Общая сумма чисел равна ${сумма}`

  🔔 PS: Делать проверку того, что пользователь ввел именно число, а не произвольный набор
      символов, не обязательно. Если хотите, в случае некорректного ввода покажите alert с текстом
      'Было введено не число, попробуйте еще раз', при этом результат prompt записывать
      в массив чисел не нужно, после чего снова пользователю предлагается ввести число в prompt.
*/
const numbers = [];

do {
  const userInput = prompt('Введите число');
  const userInputNum = Number(userInput);

  if (userInput === null) {
    break;
  } else if ( Number.isNaN(userInputNum) ) {
    alert('Было введено не число, попробуйте еще раз');
  } else {
    numbers.push(userInputNum);
  }

} while (true);

let total = 0;

for (const key of numbers) {
  total += key;
}

alert (`Общая сумма чисел равна ${total}`);

console.log(numbers);

console.log(total);

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

  Напишите скрипт авторизации пользователя.

  Есть массив паролей зарегистрированных пользователей passwords.

  При посещении страницы, необходимо попросить пользователя ввести свой пароль,
  после чего проверить содержит ли массив passwords пароль введенный пользователем.

  Пароль можно ввести не верно всего n раз, кол-во хранится в переменной attempts.
  Подсказка: используйте цикл do...while.
  Если был введен пароль который есть в массиве passwords, вывести alert
  с текстом 'Добро пожаловать!' и прекратить спрашивать пароль в цикле.
  Если был введен не существующий пароль, отнять от лимита попыток единицу,
  вывести alert с текстом "Неверный пароль, у вас осталось n попыток",
  где n это оставшийся лимит.

  После того как пользователь закрыл alert, запросить пароль снова.
  Продолжать запрашивать пароль до тех пор, пока пользователь не введет
  существующий пароль, не кончатся попытки или пока пользователь
  не нажмет Cancel в prompt.
  Если закончились попытки, вывести alert с текстом "У вас закончились попытки, аккаунт заблокирован!"

  Если пользователь нажмет Cancel, прекратить выполнение цикла.
*/

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;
let checkPass = false;

do {
  const userPassword = prompt('Введите свой пароль');
  attempts -= 1;

  for (const key of passwords) {
    if (userPassword === key) {
      checkPass = true;
      alert('Добро пожаловать!');
      break;
    }
  }

  if (userPassword === null) {
    break;
  } else if (attempts === 0) {
    alert('У вас закончились попытки, аккаунт заблокирован!');
    break;
  } else if (checkPass === true) {
    break;
  } else {
    alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
  }
} while (true);

// ВЕРСИЯ 2

const passwords1 = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts1 = 3;

do {
  const userPassword1 = prompt('Введите свой пароль');
  attempts1 -= 1;

  if (userPassword1 === null) {
    break;
  } else if (attempts1 === 0) {
    alert('У вас закончились попытки, аккаунт заблокирован!');
    break;
  } else if ( passwords1.includes(userPassword1) ) {
     alert('Добро пожаловать!');
     break;
  } else {
    alert(`Неверный пароль, у вас осталось ${attempts1} попыток`);
  }
} while (true);