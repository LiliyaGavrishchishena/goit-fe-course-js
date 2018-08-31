/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

  Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так,
  чтобы можно было создать любое количество галлерей на странице. Функционал плагина
  аналогичный заданию выше.

  При создании экземпляра конструктор получает:
    - items - список элементов для preview
    - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
    - defaultActiveItem - номер активного элемента preview по умолчанию

  Тогда создание экземпляра будет выглядеть следующим образом.
*/

// new Gallery({
//   items: galleryItems,
//   parentNode: document.querySelector('.image-gallery'),
//   defaultActiveItem: 1
// });

/* Далее плагин работает в автономном режиме */

'use strict';

const galleryItems = [
  {
    preview: 'img/img1_320_213.jpeg',
    fullview: 'img/img1_1280_853.jpeg',
    alt: 'city ​​at sunset',
  },
  {
    preview: 'img/img2_320_213.jpeg',
    fullview: 'img/img2_1280_853.jpeg',
    alt: 'crossroads of people and cars',
  },
  {
    preview: 'img/img3_320_213.jpeg',
    fullview: 'img/img3_1280_853.jpeg',
    alt: 'night city',
  },
  {
    preview: 'img/img4_320_213.jpeg',
    fullview: 'img/img4_1280_853.jpeg',
    alt: "skyscrapers from a bird's-eye view",
  },
  {
    preview: 'img/img5_320_213.jpeg',
    fullview: 'img/img5_1280_853.jpeg',
    alt: 'skyscrapers from the ground',
  },
  {
    preview: 'img/img6_320_213.jpeg',
    fullview: 'img/img6_1280_853.jpeg',
    alt: 'night city in a fog',
  },
];

class Gallery {
  constructor({ items, parentNode, defaultActiveItem }) {
    this.items = items;
    this.parentNode = parentNode;
    this.defaultActiveItem = defaultActiveItem;

    this.createGallery();
  }

  createGallery() {
    const full = document.createElement('div');
    full.classList.add('fullview');

    const full_img = document.createElement('img');
    full_img.setAttribute('src', this.items[this.defaultActiveItem].fullview);

    const prev = document.createElement('ul');
    prev.classList.add('preview');
    prev.addEventListener('click', this.handlerFullviewImg);


    full.append(full_img);
    prev.insertAdjacentHTML('afterbegin', this.createPrevItems());
    this.parentNode.append(full, prev);
  }

  createPrevItem({ preview, fullview, alt }) {
    return `<li>
    <img src=${preview}
    data-fullview=${fullview}
    alt='${alt}'></li>
    `;
  }

  createPrevItems() {
    return this.items.reduce(
      (acc,item) => (acc += this.createPrevItem(item)),
      '',
    );
  }

  handlerFullviewImg(event) {
    event.preventDefault();
    const itemClick = event.target;
    const fullview = document.querySelector('.fullview img')

    if (itemClick.nodeName !== 'IMG') return;
    fullview.setAttribute('src', itemClick.dataset.fullview);
  };
}

new Gallery({
  items: galleryItems,
  parentNode: document.querySelector('.image-gallery'),
  defaultActiveItem: 0,
});
