import {capitalize} from '@core/utils';

export class DomListner {
constructor($root, listeners=[]) {
    if (!$root) {
        throw new Error('No root provided for DomListner')
    }
    this.$root = $root
    this.listeners = listeners
}
initDOMListeners() {
    this.listeners.forEach(listener => {
        const method = getMethodName(listener)
        if (!this[method]) {
            const name = this.name || ''
            new Error(`
            Method ${method} is not implemented in ${name} Component`)
        }
        this[method] = this[method].bind(this)
        this.$root.on(listener, this[method])
    })
}
    removeDOMListeners() {
        this.listeners.forEach(listner => {
            const method = getMethodName(listner)
            this.$root.off(listner, this[method])
        })
    }
}

function getMethodName(eventName) {
return 'on' + capitalize(eventName)
}
