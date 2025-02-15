import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { updateCardDescription } from '../store/todo.actions';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    imports: [CommonModule, FormsModule, DragDropModule],
})
export class ModalComponent implements OnInit {
    modalData: any = null;
    isEditingDescription: boolean = false;

    constructor(private modalService: ModalService, private store: Store) {}

    ngOnInit(): void {
        this.modalService.modal$.subscribe((data) => {
            this.modalData = data;
        });
    }

    close() {
        this.modalService.closeModal();
    }

    saveDescription() {
        this.store.dispatch(
            updateCardDescription({
                todoId: this.modalData.todoId,
                cardId: this.modalData.cardId,
                description: this.modalData.cardDescription,
            })
        );

        this.isEditingDescription = false;
    }
}
