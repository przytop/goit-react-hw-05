import axios from "axios";

export default class MovieAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: "https://api.themoviedb.org/3",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyNzk5NTM2Mi45NzY4MDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ph-M7AM5sa3DgPQ9DWPJ4xbgDSfEZChsJBq2AMAwEQk",
      },
    });
  }

  async _response(endpoint, params = {}) {
    try {
      const response = await this.axios.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch data on ${endpoint}: ${error.message}`);
    }
  }

  async getTrendingMovies(timeWindow = "day") {
    return this._response(`/trending/movie/${timeWindow}`);
  }

  async getSearchMovies(input) {
    return this._response(`/search/movie`, { query: input });
  }

  async getMovieDetails(movieId) {
    return this._response(`/movie/${movieId}`);
  }

  async getMovieCredits(movieId) {
    return this._response(`/movie/${movieId}/credits`);
  }

  async getMovieReviews(movieId) {
    return this._response(`/movie/${movieId}/reviews`);
  }
}
