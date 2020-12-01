import {DomListner} from '@core/DomListner';

export class ExcelComponent extends DomListner {
    constructor($root, options={}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.subscribe = options.subscribe || []
       this.unsubscribers = []
        this.prepare()
    }
    prepare() {}
    toHTML() {
        return ''
    }
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }
    storeChanged() {

    }
    isWatching(key) {
        return this.subscribe.includes(key)
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    init() {
        this.initDOMListeners()
    }
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
