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

function onSearch(e) {
  e.preventDefault()

  refs.galleryRef.innerHTML = "";
  incrementPage = 1
  const inputData = e.currentTarget.searchQuery.value.trim();
  fetchImg(inputData, incrementPage).then(({data}) => data).then(onValidationTotalImg)

  refs.LoadMoreRef.addEventListener('click', () => {
    incrementPage += 1;
    fetchImg(inputData, incrementPage).then(({data}) => data).then(onValidationTotalImg)
  })
  
}

function onMarkupGallery(imgArray) {
  console.log(imgArray);
  refs.LoadMoreRef.classList.toggle('is-hidden')
  if (imgArray.length === 0) {
    Notify.failure(`❌ Sorry, there are no images matching your search query. Please try again.`);
  return
  }
  refs.galleryRef.innerHTML = imgArray.map(({webformatURL,tags, likes, views, comments, downloads, largeImageURL}) => `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info"></a>
    <p class="info-item">
      <b>${likes}</b></p>
    <p class="info-item">
      <b>${views}</b></p>
    <p class="info-item">
      <b>${comments}</b></p>
    <p class="info-item">
      <b>${downloads}</b></p></div></div>`).join('');
      refs.LoadMoreRef.classList.remove('is-hidden')
      galleryRef.addEventListener('click', currentImg)
}


  const onValidationTotalImg = (data) => {
    if (data.totalHits === 0) {
    Notify.failure(`Were sorry, but you've reached the end of search results.`);
    }
    onMarkupGallery(data.hits)
  }

  function currentImg(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return
    }
    const imgOriginalLink = e.target.parentNode.href;

}
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captions: true,
  captionsData: 'alt'
});