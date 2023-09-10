import {
  MOVIE_LIST_ERROR,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  SEARCH_MOVIE_LIST_ERROR,
  SEARCH_MOVIE_LIST_SUCCESS,
} from "./action";

const initialState = {
  movieList: [],
  searchMovieList: [],
  loading: false,
  error: "",
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MOVIE_LIST_SUCCESS:
      return {
        ...state,
        movieList: action.payload,
        loading: false,
      };
    case MOVIE_LIST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SEARCH_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        searchMovieList: action.payload,
        loading: false,
      };
    case SEARCH_MOVIE_LIST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default movieReducer;
