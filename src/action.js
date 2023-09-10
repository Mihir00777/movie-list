import axios from "axios";

export const MOVIE_LIST_REQUEST = "MOVIE_LIST_REQUEST";
export const MOVIE_LIST_SUCCESS = "MOVIE_LIST_SUCCESS";
export const MOVIE_LIST_ERROR = "MOVIE_LIST_ERROR";

export const SEARCH_MOVIE_LIST_SUCCESS = "SEARCH_MOVIE_LIST_SUCCESS";
export const SEARCH_MOVIE_LIST_ERROR = "SEARCH_MOVIE_LIST_ERROR";

export const movieList = (page) => {
  return async (dispatch) => {
    dispatch({ type: MOVIE_LIST_REQUEST });
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=26eb8fe0ea17478b691097b4e10c4ac9&page=${page}`
      );
      const list = response.data;
      dispatch({ type: "MOVIE_LIST_SUCCESS", payload: list });
    } catch (error) {
      dispatch({ type: "MOVIE_LIST_ERROR", payload: error.message });
    }
  };
};
export const searchMovieList = (page, searchQuery) => {
  return async (dispatch) => {
    try {
      //for Search Query Api
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=26eb8fe0ea17478b691097b4e10c4ac9&query=${searchQuery}&page=${page}`
      );
      const searchList = response.data;
      dispatch({ type: "SEARCH_MOVIE_LIST_SUCCESS", payload: searchList });
    } catch (error) {
      dispatch({ type: "SEARCH_MOVIE_LIST_ERROR", payload: error.message });
    }
  };
};
