const initialState = {
    popularMovies: [],
    ratedMovies: [],
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POPULAR_MOVIES':
            return { ...state, popularMovies: action.payload };
        case 'SET_RATED_MOVIES':
            return { ...state, ratedMovies: action.payload };
        default:
            return state;
    }
};

export default movieReducer;
