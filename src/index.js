import axios from "axios";
axios.get('/users')
  .then(res => {
    console.log(res.data);
  });
  import { Notify } from 'notiflix/build/notiflix-notify-aio';