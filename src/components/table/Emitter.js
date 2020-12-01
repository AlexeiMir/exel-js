export class Emitter {
    constructor() {
        this.listeners = {}
    }
    // dispatch , fire
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => listener(...args))
    }
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
/*
const emitter = new Emitter()
const unsub = emitter.subscribe('Alextest', data => console.log('Sub:', data))
emitter.emit('Alextest', 100)


setTimeout(() => {
    emitter.emit('Alextest', 'After 2 seconds')
}, 2000)

setTimeout(() => {
    unsub()
}, 3000)

setTimeout(() => {
    emitter.emit('Alextest', 'After 4 seconds')
}, 4000)
*/
