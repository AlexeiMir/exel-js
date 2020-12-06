import {clone} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constans';

const defaultState = {
    title: defaultTitle,
    colState: {},
    rowState: {},
    stylesState: {},
    dataState: {},
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()
}

const normalize = (state) => {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: ''
    }
}

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}
