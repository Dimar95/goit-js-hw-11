import axios from "axios";
export async function fetchImg(inputData, incrementPage) {
  console.log("🎅 ~ inputData", inputData)
  try {

const BASE_URL = 'https://pixabay.com/api/'
const KEY = 'key=32970540-84e885805fcb13ea237a5964c'
    const data = await axios.get(`${BASE_URL}?${KEY}&q=${inputData}&image_type=photo&orientation=horizontal&safesearch=true&page=${incrementPage}&per_page=40`);
    
    return data.data
  } catch (error) {
  console.error(error);

}
  
  }



