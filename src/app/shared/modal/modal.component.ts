import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IModal } from '../../models/modal.model';
import { ModalService } from '../../services/modal.service';
import * as bootstrap from 'bootstrap';
import { IModalProps } from '../../models/modal-props.model';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [],
    template: `
     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <!-- modal header -->
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" [innerHTML]="modalContent.content.title"></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- modal body -->
                <div class="modal-body" [innerHTML]="modalContent.content.body"></div>

                <!-- modal footer -->
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" (click)="onModalCancel()"
                        [innerHTML]="modalContent.content.cancelButtonLabel"></button>
                    <button type="button" class="btn btn-primary" (click)="onModalConfirm()"
                        [innerHTML]="modalContent.content.confirmButtonLabel"></button>
                </div>
            </div>
        </div>

    </div>
  `,
    styles: ``
})
export class ModalComponent {
    #domSan = inject(DomSanitizer);
    #modalService = inject(ModalService);

    myModal: bootstrap.Modal | undefined;

    modalContent: IModalProps = {
        content: {
            id: 0,
            title: '..',
            body: '..',
            cancelButtonLabel: 'Cancel',
            confirmButtonLabel: 'Confirm',
        },
        cancelAction: null,
        confirmAction: null
    };

    sub = this.#modalService.modalContent$
        .subscribe({
            next: (newModalProps) => {
                if (newModalProps !== null) {
                    this.modalContent.content.id = newModalProps.content.id;
                    this.modalContent.content.title = newModalProps.content.title;
                    this.modalContent.content.body = newModalProps.content.body;
                    this.modalContent.content.cancelButtonLabel = newModalProps.content.cancelButtonLabel;
                    this.modalContent.content.confirmButtonLabel = newModalProps.content.confirmButtonLabel;

                    if (typeof newModalProps.cancelAction === 'function') {
                        this.modalContent.cancelAction = newModalProps.cancelAction;
                    }

                    if (typeof newModalProps.confirmAction === 'function') {
                        this.modalContent.confirmAction = newModalProps.confirmAction;
                    }

                    this.myModal?.show();
                }
            }
        });

    ngAfterViewInit() {
        this.myModal = new bootstrap.Modal((document.getElementById('exampleModal') as HTMLDivElement), { backdrop: 'static' });
    }

    onModalConfirm() {
        if (this.modalContent.confirmAction !== null) {
            this.modalContent.confirmAction();
        }
    }

    onModalCancel() {
        if (this.modalContent.cancelAction !== null) {
            this.modalContent.cancelAction();
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
