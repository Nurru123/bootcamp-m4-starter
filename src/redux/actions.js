
export function searchMovie(moviesList) {
    return {
        type: 'SEARCH_MOVIE',
        payload: {
          moviesList: moviesList
        }
      }
}

export function addToFavorites(obj) {
    return {
        type: 'ADD_MOVIE_TO_FAVORITES',
        payload: {
          obj: obj
        }
      }
}

export function removeFromFavorites(index) {
    return {
        type: 'REMOVE_FROM_FAVORITES',
        payload: {
            index: index
        }
    }
}