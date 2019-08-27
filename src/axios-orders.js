import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-71d0f.firebaseio.com/'
});

export default instance;
