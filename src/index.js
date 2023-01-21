import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchImg } from './js/fatch-img'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let incrementPage;
let totalHits = 0;
let inputData = null;

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
  refs.LoadMoreRef.classList.add('is-hidden')
  refs.galleryRef.innerHTML = "";
  incrementPage = 1
  totalHits = 0

  inputData = e.currentTarget.searchQuery.value.trim();
  
  const fetch = await fetchImg(inputData, incrementPage)
  if (fetch.totalHits !== 0) {
    Notify.info(`Hooray! We found ${fetch.totalHits} images.`)
  };
  onValidationTotalImg(fetch);
 

  // await ;
  
  
  refs.LoadMoreRef.addEventListener('click', onLoadMore);
  
}

async function onLoadMore() {
  incrementPage += 1;
  const fetch = await fetchImg(inputData, incrementPage);
  onValidationTotalImg(fetch);
};

function onMarkupGallery(imgArray) {

  const markupGallery = imgArray.map(({webformatURL,tags, likes, views, comments, downloads, largeImageURL}) => `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>${likes}</p>
    <p class="info-item">
      <b>Views</b>${views}</p>
    <p class="info-item">
      <b>Comments</b>${comments}</p>
    <p class="info-item">
      <b>Downloads</b>${downloads}</p></div></div></a>`).join('');
    refs.galleryRef.insertAdjacentHTML('beforeend', markupGallery)
  const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captions: true,
  captionsData: 'alt'
  }).refresh();
  onScroll()

 
}

const onValidationTotalImg = (data) => {

    if (data.hits.length === 0) {
      Notify.failure(`❌ Sorry, there are no images matching your search query. Please try again.`);
        return
      }
    totalHits += data.hits.length

  if (data.totalHits === totalHits) {
   refs.LoadMoreRef.classList.add('is-hidden')
    Notify.info(`Were sorry, but you've reached the end of search results.`)
  }else{
    refs.LoadMoreRef.classList.remove('is-hidden')
      }
    onMarkupGallery(data.hits)

  };

function onScroll() {
  if (incrementPage < 2) {
    return
  }
 const cardHeight = refs.galleryRef.firstElementChild.getBoundingClientRect();
window.scrollBy({
  top: cardHeight.height * 2.5,
  behavior: "smooth",
});
}


// const fetch = await fetchImg(inputData, incrementPage).then(({ data }) => {
//     console.log(data)
//     if (data.totalHits !== 0) {
//       Notify.info(`Hooray! We found ${data.totalHits} images.`)
//     } return data
//   }).then(onValidationTotalImg);
//   refs.LoadMoreRef.addEventListener('click', onLoadMore);