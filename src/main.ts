import { todoReducer } from './app/store/todo.reducer';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
    providers: [provideStore({ todos: todoReducer })],
}).catch((err) => console.error(err));
