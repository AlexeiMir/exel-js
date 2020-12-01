export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    select($el) {
        this.clear()
        this.current = $el
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
    }
    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }
    selectGroup($group) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
    applyStyles(styles) {
        this.group.forEach($el => $el.css(styles))
    }
}
