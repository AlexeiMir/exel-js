import {Page} from '@core/Page';
import {$} from '@/core/dom'
import {getDashBoardRecords} from './dashboard.functions'

export class DashBoardPage extends Page {
    getRoot() {
        const now = Date.now().toString()
        return $.create('div', 'db').html(`
         <div class="db__header">
            <h1>Excel dashboard</h1>
        </div>
        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${now}" class="db__create">
                    Новая <br /> таблица
                </a>
            </div>
        </div>
        <div class="db__table db__view">
            ${getDashBoardRecords()}
        </div>
        `)
    }
}
