import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo, Card } from '../../models/todo.model';
import {
    addTodo,
    removeTodo,
    addCard,
    updateCategory,
} from '../../store/todo.actions';
import { selectTodos } from '../../store/todo.selectors';
import { ModalService } from '../../service/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    imports: [CommonModule, FormsModule, DragDropModule],
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]> | undefined;
    categoryInputTexts: string[] = [];
    creatingCategoryIndex: number = 0;
    addCardIndex: number | null = null;
    cardTexts: { [key: number]: string } = {};

    constructor(private store: Store, private modalService: ModalService) {}

    ngOnInit(): void {
        this.todos$ = this.store.select(selectTodos);
    }

    addTodo(event: Event, id: number): void {
        event.stopPropagation();
        if (this.categoryInputTexts[id].trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                category: this.categoryInputTexts[id],
                cards: [],
            };
            this.store.dispatch(addTodo({ todo: newTodo }));
            this.categoryInputTexts[id] = '';
        }
    }

    cancelCreateCategory(event: Event, id: number): void {
        event.stopPropagation();
        this.creatingCategoryIndex = 0;
        this.categoryInputTexts[id] = '';
    }

    removeTodo(id: number): void {
        this.store.dispatch(removeTodo({ id }));
    }

    openCardInput(index: number): void {
        this.addCardIndex = index;
    }

    closeCardInput(): void {
        this.addCardIndex = null;
    }

    addCardToCategory(todoId: number): void {
        if (!this.cardTexts[todoId] || this.cardTexts[todoId].trim() === '')
            return;

        const newCard: Card = {
            id: Date.now(),
            text: this.cardTexts[todoId].trim(),
            completed: false,
        };

        this.store.dispatch(addCard({ todoId, card: newCard }));
        this.cardTexts[todoId] = '';
        this.closeCardInput();
    }

    openModal(todo: Todo, card: Card): void {
        this.modalService.openModal({
            todoCategory: todo.category,
            todoId: todo.id,
            cardText: card.text,
            cardCompleted: card.completed,
            cardDescription: card.description,
            cardId: card.id,
        });
    }
}
