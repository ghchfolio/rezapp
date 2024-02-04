import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import * as bootstrap from 'bootstrap';

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
                    <h1 class="modal-title fs-5 x-title" id="exampleModalLabel"></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- mocancelel -->
                <div class="modal-body x-body"></div>

                <!-- modal footer -->
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-secondary x-cancel" data-bs-dismiss="modal" (click)="onModalCancel()"></button>
                    <button type="button" class="btn btn-primary x-confirm" (click)="onModalConfirm()"></button>
                </div>
            </div>
        </div>

    </div>
  `,
    styles: ``
})
export class ModalComponent {
    #modalService = inject(ModalService);

    myModal: bootstrap.Modal | undefined;
    cancelAction = function () { window.alert('This is the default CANCEL function') };
    confirmAction = function () { window.alert('This is the default CONFIRM function') };

    sub = this.#modalService.modalContent$
        .subscribe({
            next: (newModalProps) => {
                if (newModalProps !== null) {
                    const titleEl = document.getElementsByClassName('x-title')[0];
                    titleEl.textContent = newModalProps.content.title;

                    const bodyEl = document.getElementsByClassName('x-body')[0];
                    bodyEl.textContent = newModalProps.content.body;

                    const cancelEl = document.getElementsByClassName('x-cancel')[0];
                    cancelEl.textContent = newModalProps.content.cancelButtonLabel;

                    const confirmEl = document.getElementsByClassName('x-confirm')[0];
                    confirmEl.textContent = newModalProps.content.confirmButtonLabel;

                    if (typeof newModalProps.cancelAction === 'function') {
                        this.cancelAction = newModalProps.cancelAction;
                    }

                    if (typeof newModalProps.confirmAction === 'function') {
                        this.confirmAction = newModalProps.confirmAction;
                    }

                    this.myModal?.show();
                }
            }
        });

    ngAfterViewInit() {
        this.myModal = new bootstrap.Modal(
            (document.getElementById('exampleModal') as HTMLDivElement),
            { backdrop: 'static' }
        );
    }

    onModalConfirm() {
        this.confirmAction();
        this.#modalService.clearModalContent();
    }

    onModalCancel() {
        this.cancelAction();
        this.#modalService.clearModalContent();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
