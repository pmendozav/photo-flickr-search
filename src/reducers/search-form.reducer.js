import { FORM_CLEAR, FORM_CONTENT } from '../constants/search-form';

const initialState = {
  formContent: {
    tags: [],
    copyright: true,
    license: false,
    dateFrom: new Date(Date.now() - 864e5),
    dateTo: new Date()
  },
};

export function searchReducer(state = initialState, action) {
    switch (action.type) {
        case FORM_CLEAR:
            return initialState;
        case FORM_CONTENT:
            return {
                ...state,
                formContent: {
                    ...state.formContent,
                    [action.data.name]: action.data.value
                }
            }; 
        default:
            return state;
    }
}