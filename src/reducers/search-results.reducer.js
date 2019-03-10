import { SEARCH_RESULTS } from '../constants/search-results';

const initialState = {
    photoInfo: {
        payload: [],
        isLoading: false,
        hasError: false,
    },
    scroll: {
        hasMoreItems: true,
        currentPage: 1,
        totalPages: 0
    },
};

export function resultReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESULTS.REQUEST:
            return {
                ...state,
                photoInfo: {
                    ...state.photoInfo,
                    isLoading: true,
                },
                scroll: {
                    ...state.scroll,
                }
            };
        case SEARCH_RESULTS.FAILURE:
            return {
                ...state,
                photoInfo: {
                    ...state.photoInfo,
                    isLoading: false,
                    hasError: true,
                },
                scroll: {
                    ...state.scroll,
                }
            };
        case SEARCH_RESULTS.SUCCESS:
            return {
                ...state,
                photoInfo: {
                    ...state.photoInfo,
                    isLoading: false,
                    hasError: false,
                    payload: [...state.photoInfo.payload, ...action.data]
                },
                scroll: {
                    ...state.scroll,
                    currentPage: state.scroll.currentPage + 1,
                    hasMoreItems: (state.scroll.currentPage < action.totalPages),
                    totalPages: action.totalPages
                }
            };
        case SEARCH_RESULTS.CLEAR:
            return initialState;
        default:
            return state;
    }
}