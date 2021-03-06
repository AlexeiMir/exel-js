import {$} from '@core/dom';

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        let value
        const $resizer = $(event.target)
        const type = $resizer.data.resize
        const sideProp = type === 'col' ? 'bottom' : 'right'
        $resizer.css({
            opacity: 1,
            [sideProp]: '-2000px'
        })
        const $parent = $resizer.closest('[data-type = "resizable"]')
        const coords = $parent.getCoords()
        document.onmousemove = (e) => {
            if (type === 'col') {
                const delta = e.pageX - coords.right
                $resizer.css({right: -delta + 'px'})
                value = coords.width + delta
            } else {
                const delta = e.pageY - coords.bottom
                $resizer.css({bottom: -delta + 'px'})
                value = coords.height + delta
            }
        }
        document.onmouseup = e => {
            document.onmousemove = null
            document.onmousemove = null
            if (type === 'col') {
                $parent.css({width: value + 'px'})
                $root
                    .findAll(`[data-col = "${$parent.data.col}"]`)
                    .forEach(el => el.style.width = value + 'px')
            } else {
                $parent.css({height: value + 'px'})
            }
            resolve({
                value,
                type,
                id: type === 'col' ? $parent.data.col : $parent.data.row
            })
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    })
}
