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

class Stopwatch {
  constructor(parentNode) {
    this.id = null;
    this.parentNode = parentNode;
    this.startTime = null;
    this.deltaTime = null;
    this.isActive = false;
    this.watchTime = '00:00.0';

    this.createStopwatch();
  }

  createStopwatch() {
    const stopwatchFace = document.createElement('div');
    stopwatchFace.classList.add('stopwatch');

    const stopwatchTime = document.createElement('p');
    stopwatchTime.classList.add('js-time');
    stopwatchTime.textContent = this.watchTime;

    const startBtn = document.createElement('button');
    startBtn.classList.add('js-start');
    startBtn.textContent = 'Start';
    startBtn.addEventListener('click', this.handleStartBtnClick.bind(this));

    const lapBtn = document.createElement('button');
    lapBtn.classList.add('js-take-lap');
    lapBtn.textContent = 'Lap';
    lapBtn.addEventListener('click', this.handleRecordLap.bind(this));

    const resetBtn = document.createElement('button');
    resetBtn.classList.add('js-reset');
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', this.handleStopBtnClick.bind(this));

    const lapsList = document.createElement('ul');
    lapsList.classList.add('js-laps');

    stopwatchFace.append(stopwatchTime, startBtn, lapBtn, resetBtn);

    this.parentNode.append(stopwatchFace, lapsList);
  }

  start() {
    if (this.isActive) return;

    this.isActive = true;
    this.startTime = Date.now() - this.deltaTime;

    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;

      this.updateClockface();
    }, 100);
  }

  stop() {
    clearInterval(this.id);
    this.isActive = false;
  }

  reset() {
    this.stop();
    this.deltaTime = 0;
    this.updateClockface(this.deltaTime);
  }

  updateClockface() {
    this.watchTime.textContent = this.formatTime();
  }

  formatTime() {
    const date = new Date();

    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    let seconds = date.getSeconds();
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const mseconds = String(date.getMilliseconds()).slice(0, 1);

    return `${minutes}:${seconds}.${mseconds}`;
  }

  handleStartBtnClick() {
    if (!this.isActive) {
      this.start();
      this.textContent = 'Pause';
    } else {
      this.stop();
      this.textContent = 'Continue';
    }
  }

  handleStopBtnClick() {
    this.reset();
    this.startBtn.textContent = 'Start';
  }

  handleRecordLap(event) {
    const lap = document.createElement('li');
    lap.textContent = timeBoard.textContent;
    this.lapsList.append(lap);
  }


}

const parentA = document.body;
new Stopwatch(parentA);

const parentB = document.body;
new Stopwatch(parentB);
