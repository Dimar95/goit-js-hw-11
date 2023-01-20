import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchImg } from './js/fatch-img'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let incrementPage = 1;

Notify.init({
  timeout: 2000,
  clickToClose: true,
});

const refs = {
  galleryRef: document.querySelector('.gallery'),
  formRef: document.getElementById('search-form'),
  LoadMoreRef: document.querySelector('.load-more'),
}
refs.formRef.addEventListener('submit',onSearch);

async function onSearch(e) {
  e.preventDefault()
  refs.galleryRef.innerHTML = "";
  // const inputData = e.currentTarget.searchQuery.value.trim();
  const newArrayImg = await fetchImg(e,incrementPage).then(data => data.data.hits)
  if (newArrayImg.length === 0) {
    Notify.failure(`❌ Sorry, there are no images matching your search query. Please try again.`);
  }
  onMarkupGallery(newArrayImg)
  incrementPage += 1;
}

function onMarkupGallery(imgArray) {
  refs.galleryRef.innerHTML = imgArray.map(({webformatURL,tags, likes, views, comments, downloads}) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b></p>
    <p class="info-item">
      <b>${views}</b></p>
    <p class="info-item">
      <b>${comments}</b></p>
    <p class="info-item">
      <b>${downloads}</b></p></div></div>`).join('');
  const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captions: true,
  captionsData: 'alt'
  });
  onLoadMoreRef()

}

function onLoadMoreRef() {
  refs.LoadMoreRef.classList.toggle('is-hidden')
  refs.LoadMoreRef.addEventListener('click', onSearch);
}