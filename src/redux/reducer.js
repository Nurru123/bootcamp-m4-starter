const initialStore = {
    movies: [],
    favorites: []
}

function reducer(state = initialStore, action) {
    const { favorites } = state;
    switch (action.type) {
        case 'SEARCH_MOVIE':
            const { moviesList } = action.payload;
            return { ...state, movies: moviesList };
            
        case 'ADD_MOVIE_TO_FAVORITES':
            const { obj } = action.payload
            const newFavorites = [...favorites];
            const movie = newFavorites.find(item => item.imdbID === obj.imdbID);
            if (!movie) {
                newFavorites.push(obj);
                return { ...state, favorites: newFavorites, };
                
            } else { 
                alert('Этот фильм уже есть в избранном');
                return state;
            }
        case 'REMOVE_FROM_FAVORITES':
            const { index } = action.payload;
            const anotherFavorites = [...favorites];
            anotherFavorites.splice(index, 1);
            return { ...state, favorites: anotherFavorites };
            
        default: return state;
    }

}

export default reducer;