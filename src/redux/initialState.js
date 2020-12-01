import {storage} from '@core/utils';
import {defaultStyles} from '@/constans';

const defaultState = {
    title: '',
    colState: {},
    rowState: {},
    stylesState: {},
    dataState: {},
    currentText: '',
    currentStyles: defaultStyles
}

const normalize = (state) => {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: ''
    }
}

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState
