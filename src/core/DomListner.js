export class DomListner {
constructor($root) {
    if (!$root) {
        throw new Error('No root provided for DomListner')
    }
    this.$root = $root
}
}
