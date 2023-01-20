import axios from "axios";
export async function fetchImg(e, incrementPage) {
  const formRef = document.getElementById('search-form')
  const inputData = e.currentTarget.searchQuery.value.trim();
    const BASE_URL = 'https://pixabay.com/api/'
    const KEY = 'key=32970540-84e885805fcb13ea237a5964c'

      const response = await axios.get(`${BASE_URL}?${KEY}&q=${inputData}&image_type=photo&orientation=horizontal&safesearch=true&page=${incrementPage}&per_page=40`);
      return response
  }









// export async function fetchImg(inputData,incrementPage) {
//     console.log(inputData);

//     const BASE_URL = 'https://pixabay.com/api/'
//     const KEY = 'key=32970540-84e885805fcb13ea237a5964c'
//     try {

//       const response = await axios.get(`${BASE_URL}?${KEY}&q=${inputData}&image_type=photo&orientation=horizontal&safesearch=true&page=${incrementPage}&per_page=40`);
//       const array = await response.json();
//       console.log(array);
//     }catch (error) {
//         console.error(error);
//       }

// };

