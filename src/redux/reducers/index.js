import { combineReducers } from 'redux';
import movieReducer from './movie-reducers';

const rootReducer = combineReducers({
    movies: movieReducer,
});

export default rootReducer;
