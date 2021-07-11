import axios from "axios";

export default {
  // Gets all books
  getMovies: function () {
    return axios.get("/api/movies");
  },
};