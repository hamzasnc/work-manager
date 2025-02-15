import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ModalComponent } from './modal/modal.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [TodoListComponent, ModalComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'work-manager';
}
