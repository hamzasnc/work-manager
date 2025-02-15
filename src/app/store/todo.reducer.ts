import { createReducer, on } from '@ngrx/store';
import {
    addTodo,
    removeTodo,
    addCard,
    updateCategory,
    updateCardDescription,
} from './todo.actions';
import { Todo } from '../models/todo.model';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
    initialState,
    on(addTodo, (state, { todo }) => [...state, todo]),
    on(removeTodo, (state, { id }) => state.filter((todo) => todo.id !== id)),
    on(addCard, (state, { todoId, card }) =>
        state.map((todo) =>
            todo.id === todoId
                ? { ...todo, cards: [...todo.cards, card] }
                : todo
        )
    ),
    on(updateCategory, (state, { todoId, cards }) => {
        return state.map((todo) =>
            todo.id === todoId ? { ...todo, cards } : todo
        );
    }),
    on(updateCardDescription, (state, { todoId, cardId, description }) => {
        return state.map((todo) => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    cards: todo.cards.map((card) =>
                        card.id === cardId ? { ...card, description } : card
                    ),
                };
            }
            return todo;
        });
    })
);
