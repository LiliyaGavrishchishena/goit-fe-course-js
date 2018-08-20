/*
  Создайте скрипт секундомера.
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/

  Изначально в HTML есть разметка:

  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>

  Добавьте следующий функционал:

  - При нажатии на кнопку button.js-start, запускается таймер, который считает время
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).

    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.

  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause',
    а функционал при клике превращается в оставновку секундомера без сброса
    значений времени.

    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.

  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени,
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени
    с 6 секунд, а не с 16.

    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.

  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.

  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/
"use strict";

const timeBoard = document.querySelector('.js-time');

const startBtn = document.querySelector('.js-start');
const resetBtn = document.querySelector('.js-reset');
const lapBtn = document.querySelector('.js-take-lap');

const lapsList = document.querySelector('.js-laps');

const timer = {
  id: null,
  startTime: null,
  deltaTime: 0,
  isActive: false,
  isActiveReset: false,

  start() {
    if (this.isActive) return;

    this.isActive = true;
    this.startTime = Date.now() - this.deltaTime;

    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;

      updateClockface(this.deltaTime);
    }, 100);
  },

  stop() {
    clearInterval(this.id);
    this.isActive = false;
  },

  reset() {
    this.stop();
    this.deltaTime = 0;
    updateClockface(this.deltaTime);
  },
};

startBtn.addEventListener('click', handleStartBtnClick);
resetBtn.addEventListener('click', handleStopBtnClick);
lapBtn.addEventListener('click', handleRecordLap);

function handleStartBtnClick() {
  if (!timer.isActive) {
    timer.start();
    this.textContent = 'Pause';
  } else {
    timer.stop();
    this.textContent = 'Continue';
  }
}

function handleStopBtnClick() {
  timer.reset();
  startBtn.textContent = 'Start';
}

function updateClockface(time) {
  const formattedTime = formatTime(time);
  timeBoard.textContent = formattedTime;
}

function formatTime(ms) {
  const date = new Date(ms);

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = date.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const mseconds = String(date.getMilliseconds()).slice(0, 1);

  return `${minutes}:${seconds}.${mseconds}`;
}

function handleRecordLap (event) {
  const lap = document.createElement('li');
  lap.textContent = timeBoard.textContent;
  lapsList.append(lap);
}


/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

  Выполните домашнее задание используя класс с полями и методами.

  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет
  динамически создана вся разметка для секундомера.

  Должна быть возможность создать сколько угодно экземпляров секундоментов
  на странице и все они будут работать независимо.

  К примеру:

  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);

  Где parent* это существующий DOM-узел.
*/
