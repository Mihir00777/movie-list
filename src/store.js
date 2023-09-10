import { createStore, applyMiddleware, combineReducers } from "redux";
import movieReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  movies: movieReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
