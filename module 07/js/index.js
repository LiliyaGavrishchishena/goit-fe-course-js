'use strict';

const createPost = ({img, title, text, link}) => {
  const post = document.createElement('div');
  post.classList.add('post');

  const image = document.createElement('img');
  image.classList.add('post__image');
  image.setAttribute('src', img);
  image.setAttribute('alt', '');

  const head = document.createElement('h2');
  head.classList.add('post__title');
  head.textContent = title;

  const descr = document.createElement('p');
  descr.classList.add('post__text');
  descr.textContent = text;

  const btn = document.createElement('a');
  btn.classList.add('button');
  btn.textContent = 'Read more';
  btn.setAttribute('href', link);

  post.append(image, head, descr, btn);
  return post;
}

const createPostCard = posts => {
  const elements = posts.map(post => createPost(post));

  return elements;
};

const element = document.querySelector('.cardList');
element.append(...createPostCard(posts));

