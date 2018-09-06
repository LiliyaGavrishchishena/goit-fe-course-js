/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.

  Есть массив объектов (дальше в задании), каждый из которых описывает
  ноутбук с определенными характеристиками.

  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.

  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам.

  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }

  После чего выберите из массива только те объекты, которые подходят
  под выбраные пользователем критерии и отрендерите список карточек товаров.

  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается,
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/
'use strict';

const laptops = [
  {
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'gray',
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'black',
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'white',
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'gray',
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'black',
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'white',
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'gray',
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'black',
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
];

const form = document.querySelector('.js-form');
const allInputsOfForm = {};

function createForm(checkbox, items) {
  checkbox.size = items
    .map(item => item.size)
    .filter((x, i, a) => a.indexOf(x) == i);
  checkbox.color = items
    .map(item => item.color)
    .filter((x, i, a) => a.indexOf(x) == i);
  checkbox.release_date = items
    .map(item => item.release_date)
    .filter((x, i, a) => a.indexOf(x) == i);

  const templateForm = document
    .querySelector('#template-form')
    .innerHTML.trim();
  const compileForm = Handlebars.compile(templateForm);
  const markupForm = compileForm(checkbox);

  form.insertAdjacentHTML('afterbegin', markupForm);
}

createForm(allInputsOfForm, laptops);

function createGrid(items) {
  const gridList = document.querySelector('.grid-list');
  const templateCard = document
    .querySelector('#template-card')
    .innerHTML.trim();
  const compileCard = Handlebars.compile(templateCard);
  const markupCard = items.reduce((acc, item) => acc + compileCard(item), '');

  gridList.innerHTML = markupCard;
}

createGrid(laptops);

form.addEventListener('submit', handleFormSubmitFilter);
form.addEventListener('reset', handleFormResetFilter);

function handleFormSubmitFilter(event) {
  event.preventDefault();

  const inputSizeChecked = Array.from(
    form.querySelectorAll('input[name=size]:checked'),
  );
  const inputColorChecked = Array.from(
    form.querySelectorAll('input[name=color]:checked'),
  );
  const inputReleaseDateChecked = Array.from(
    form.querySelectorAll('input[name=release_date]:checked'),
  );

  const filter = {};

  filter.size =
    inputSizeChecked.length === 0
      ? allInputsOfForm.size
      : inputSizeChecked.map(item => +item.value);
  filter.color =
    inputColorChecked.length === 0
      ? allInputsOfForm.color
      : inputColorChecked.map(item => item.value);
  filter.release_date =
    inputReleaseDateChecked.length === 0
      ? allInputsOfForm.release_date
      : inputReleaseDateChecked.map(item => +item.value);

  createFilteredItems(filter);
}

function createFilteredItems({ size, color, release_date }) {
  const filteredItems = laptops.filter(
    laptop =>
      size.includes(laptop.size) &&
      color.includes(laptop.color) &&
      release_date.includes(laptop.release_date)
  );

  createGrid(filteredItems);
}

function handleFormResetFilter(event) {

  createGrid(laptops);
}
