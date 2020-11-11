const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
    const resize = index ?`<div class="row-resize" data-resize="row"></div>`:''
return `<div class="row" data-type="resizable">
                <div class="row-info">${index ? index : ''}
                ${resize}
                </div>
                <div class="row-data">
                ${content}
                </div>
            </div>`
}

function toColumn(column, index) {
    return `<div class="column" data-type="resizable" 
data-col="${index}">${column} 
        <div class="col-resize" data-resize="col"></div>
</div>`
}

function toCell(_, col) {
    return `<div class="cell" data-col="${col}"  
contenteditable=""></div>`
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
