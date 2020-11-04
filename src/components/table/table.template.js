const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
return `<div class="row">
                <div class="row-info">${index ? index : ''}</div>
                <div class="row-data">
                ${content}
                </div>
            </div>`
}

function toColumn(column) {
    return `<div class="column">${column}</div>`
}

function toCell(cell) {
    return `<div class="cell" contenteditable="">${cell}</div>`
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}


export function createTable(rowCounts=15) {
const colCounts = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colCounts).fill('')
        .map(toChar)
        .map(toColumn)
        .join('')
    rows.push(createRow(null, cols))
    for (let i = 0; i<=rowCounts; i++) {
        const cells = new Array(colCounts).fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i+1, cells))
    }
    return rows.join('')
}
