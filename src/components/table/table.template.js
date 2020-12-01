import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constans';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}
function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function createRow(index, content, state) {
    const height = getHeight(state, index)
    const resize = index
        ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `<div class="row" data-type="resizable" 
                 data-row="${index}"
                 style="height: ${height}"
                 >
                <div class="row-info">${index ? index : ''}
                ${resize}
                </div>
                <div class="row-data">
                ${content}
                </div>
            </div>`
}

function toColumn({col, index, width}) {
    return `<div class="column" 
                 data-type="resizable" 
                 style="width: ${width}"
                 data-col="${index}">${col} 
        <div class="col-resize" data-resize="col"></div>
</div>`
}

function toCell(row, state) {
    return function(_, col) {
        const width = getWidth(state.colState, col)
        const id =`${row}:${col}`
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        const data = state.dataState[id]
        return `<div class="cell" 
            data-col="${col}"
            data-id="${id}"
            style="width: ${width}; ${styles}"
            data-cell="cell"
            data-value="${data || ''}"  
            contenteditable="">${parse(data) || ''}</div>`
    }
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
    return function(col, index) {
        const width = getWidth(state, index)
        return {col, index, width}
    }
}

export function createTable(rowCounts = 15, state={}) {
    const colCounts = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colCounts).fill('')
        .map(toChar)
        .map(withWidthFrom(state.colState))
        .map(toColumn)
        .join('')
    rows.push(createRow(null, cols, {}))
    for (let row = 0; row <= rowCounts; row++) {
        const cells = new Array(colCounts).fill('')
            .map(toCell(row, state))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }
    return rows.join('')
}
