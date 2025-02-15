import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/todo.model';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private modalSubject = new BehaviorSubject<any>(null);
    modal$ = this.modalSubject.asObservable();
    private cards: Card[] = [];

    openModal(data: any) {
        this.modalSubject.next(data);
    }

    closeModal() {
        this.modalSubject.next(null);
    }
}
