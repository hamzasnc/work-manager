import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const selectTodos = createFeatureSelector<Todo[]>('todos');

export const selectCardDescription = (todoId: number, cardId: number) =>
    createSelector(selectTodos, (todos: Todo[]) => {
        const todo = todos.find((todo) => todo.id === todoId);
        if (todo) {
            const card = todo.cards.find((card) => card.id === cardId);
            return card ? card.description : null;
        }
        return null;
    });
