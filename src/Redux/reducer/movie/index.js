import { ActionsType } from "../../action/action_movie";

const initialState = {
  movies: [],
  selectedMovie: [],
  savedMovies:[]
};

export const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionsType.FETCH_MOVIES:
      return { ...state, movies: payload };
    case ActionsType.SELECT_MOVIES:
      return { ...state, selectedMovie: payload };
    case ActionsType.REMOVE_MOVIES:
      return { ...state, selectedMovie: {} };
    case ActionsType.SAVED_MOVIES:
      return { ...state, savedMovies: [payload,...state.savedMovies] };
    default:
      return state;
  }
};
