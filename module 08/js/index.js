/*
  Создайте компонент галлереи изображений следующего вида.

    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>

    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2


    Реализуйте функционал:

      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.

      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.

      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются
        динамически, при загрузке страницы.

      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.

      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.

      - Изображений может быть произвольное количество.

      - Используйте делегирование для элементов preview.

      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.

      - CSS-оформление и имена классов на свой вкус.


    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/
'use strict';

const galleryItems = [
  { preview: '../img/img1_320_213.jpeg', fullview: '../img/img1_1280_853.jpeg', alt: "city ​​at sunset" },
  { preview: '../img/img2_320_213.jpeg', fullview: '../img/img2_1280_853.jpeg', alt: "crossroads of people and cars" },
  { preview: '../img/img3_320_213.jpeg', fullview: '../img/img3_1280_853.jpeg', alt: "night city" },
  { preview: '../img/img4_320_213.jpeg', fullview: '../img/img4_1280_853.jpeg', alt: "skyscrapers from a bird's-eye view" },
  { preview: '../img/img5_320_213.jpeg', fullview: '../img/img5_1280_853.jpeg', alt: "skyscrapers from the ground" },
  { preview: '../img/img6_320_213.jpeg', fullview: '../img/img6_1280_853.jpeg', alt: "night city in a fog" },
];

  const gallery = document.querySelector('.js-image-gallery');

  const fullview = document.createElement('div');
  fullview.classList.add('fullview');

  const fullviewImg = document.createElement('img');
  fullviewImg.setAttribute('src', galleryItems[0].fullview);
  fullviewImg.setAttribute('alt', galleryItems[0].alt);

  const preview = document.createElement('ul');
  preview.classList.add('preview');

  const prevItems = galleryItems.reduce((acc, galleryItem) => acc += createPrevItems(galleryItem), "");

  fullview.append(fullviewImg);
  preview.insertAdjacentHTML('afterbegin', prevItems);
  gallery.append(fullview, preview);

function createPrevItems( {preview, fullview, alt} ) {
  return `<li>
  <img src=${preview}
  data-fullview=${fullview}
  alt='${alt}'></li>
  `;
};

preview.addEventListener('click', handleOnClick);

function handleOnClick (event) {
  const target = event.target;
  const nodeName = target.nodeName;
  if (nodeName !== 'IMG') return; {
    fullviewImg.setAttribute("src", target.dataset.fullview);
  }
};


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