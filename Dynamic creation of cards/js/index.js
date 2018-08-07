'use strict';

// <!-- <div class="card">
// <h2 class="name">Ford Expedition NBX 4WD</h2>
// <img class="img" src="./img/1.jpg" alt="" width="300">
// <div class="content">
//   <p class="mileage">Mileage: 151,752</p>
//   <p class="transmission">transmission: Automatic</p>
//   <p class="color">color: Gray</p>
//   <p class="price">Price: 4995.00$</p>
// </div>
// <p class="descr">V8 5.4 Liter,Automatic,4WD,FX4 Off-Road,ABS (4-Wheel),Air Conditioning,Air
//   Conditioning Rear,Power Windows,Power Door Locks,Cruise Control,Power Steering,Tilt
//   Wheel,AM/FM Stereo,Cassette,CD/MP3 (Multi Disc),Premium Sound,Navigation
//   System,DVD System,Integrated Phone,Parking Sensors,Dual Air Bags'</p>
// <p class="available">Sold Out!</p>
// </div>

const createContent = (mileage, transmission, color, price) => {
  const createCont = document.createElement('div');
  createCont.classList.add('content');

  const mileageCreate = document.createElement('p');
  mileageCreate.classList.add('mileage');
  mileageCreate.textContent = `mileage ${mileage}`;

  const transmissionCreate = document.createElement('p');
  transmissionCreate.classList.add('transmission');
  transmissionCreate.textContent = `transmission ${transmission}`;

  createCont.append(mileageCreate, transmissionCreate);

  return createCont;
}

const createCards = ({name, image, mileage, transmission, color, price, descr, available}) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.classList.add('name');
  title.textContent = `${name}`;

  const photo = document.createElement('img');
  photo.classList.add('img');
  photo.setAttribute('src', image);
  photo.setAttribute('alt', '');
  photo.setAttribute('width', 300);

  const content = createContent (mileage, transmission, color, price);

  const text = document.createElement('p');
  text.classList.add('descr');
  text.textContent = `${descr}`;

  const canIBuy = document.createElement('p');
  canIBuy.classList.add('available');
  canIBuy.textContent = 'Sold Out!';
  canIBuy.hidden = !available;

  card.append(title, photo, content, text, canIBuy);

  return card;
}

const createCars = cars => {
  const elements = cars.map(car => createCards(car));

  return elements;
};

const element = document.querySelector('.sectionCards');


element.append(...createCars(cars));

