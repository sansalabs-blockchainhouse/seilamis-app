import axios from "axios";

const api = axios.create({
  // baseURL: 'https://seilamis-api-ef7dacaa3a76.herokuapp.com/'
  baseURL: "http://localhost:3001/"
});

export { api };