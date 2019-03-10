import { combineReducers } from 'redux';

import {searchReducer} from './search-form.reducer';
import {resultReducer} from './search-results.reducer';

export default combineReducers({
    searchReducer,
    resultReducer
});