import axios from "axios";

const api = axios.create({
//   baseURL: 'https://plague-api-4fdabe10ae8d.herokuapp.com/'
  baseURL: "http://localhost:3001/"
});

export { api };