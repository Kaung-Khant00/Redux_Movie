import { ActionsType } from "../action_movie";

export const fetchMovies = (movies) => {
    return {
        type: ActionsType.FETCH_MOVIES,
        payload: movies
    }
}

export const selectedMovie = (movie) => {
    return {
        type: ActionsType.SELECT_MOVIES,
        payload: movie
    }
}
export const removeSelectedMovie = (movie) => {
    return {
        type: ActionsType.REMOVE_MOVIES,
        payload: movie
    }
}

export const savedMovies = (movie) => {
    return {
        type: ActionsType.SAVED_MOVIES,
        payload: movie
    }
}