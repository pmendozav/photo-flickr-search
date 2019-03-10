import * as searchService from '../services/search.service';

import { FORM_CONTENT, FORM_CLEAR } from '../constants/search-form';
import { SEARCH_RESULTS } from '../constants/search-results';

export function updateFormContent(data) {
    return {
        type: FORM_CONTENT,
        data
    }
}

export function searchImages(input) {
    function request(value) {
        return {
            type: SEARCH_RESULTS.REQUEST
        };
    }
    function succeed(data, totalPages) {
        return {
            type: SEARCH_RESULTS.SUCCESS,
            data,
            totalPages 
        };
    }
    function failed(error) {
        return {
            type: SEARCH_RESULTS.FAILURE,
            error
        };
    }

    return (dispatch, getState) => {
        dispatch(request());

        searchService.fetchImages(input)
            .then(
                data => data.items.then(items => dispatch(succeed(items, data.totalPages))),
                error => dispatch(failed(error))
            );
    };
}

export function clearForm() {
    return {
        type: FORM_CLEAR
    };
}

export function clearResults() {
    return {
        type: SEARCH_RESULTS.CLEAR
    };
}






