import { createAction, props } from '@ngrx/store';
import { Todo, Card } from '../models/todo.model';

export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());

export const removeTodo = createAction(
    '[Todo] Remove Todo',
    props<{ id: number }>()
);

export const addCard = createAction(
    '[Todo] Add Card',
    props<{ todoId: number; card: Card }>()
);

export const updateCategory = createAction(
    '[Todo] Update Category',
    props<{ todoId: number; cards: any[] }>()
);

export const updateCardDescription = createAction(
    '[Todo] Update Card Description',
    props<{ todoId: number; cardId: number; description: string }>()
);
