import axios from "axios";
export async function fetchImg(inputData, incrementPage) {
  console.log("🚀 ~ 4", inputData);
  
const BASE_URL = 'https://pixabay.com/api/'
const KEY = 'key=32970540-84e885805fcb13ea237a5964c'
return await axios.get(`${BASE_URL}?${KEY}&q=${inputData}&image_type=photo&orientation=horizontal&safesearch=true&page=${incrementPage}&per_page=40`);
  
  }



