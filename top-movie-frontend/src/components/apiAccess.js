import axios from "axios";

export default {
  // Gets all books
  getMovies: function() {
    return axios.get("/api/movies");
  },
  // Gets the book with the given id
  getMovie: function(id) {
    console.log("/api/movies/id");
    return axios.get("/api/movies/" + id);
  }
};