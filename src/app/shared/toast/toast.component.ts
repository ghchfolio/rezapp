import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import * as bootstrap from 'bootstrap';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [NgIf, AsyncPipe],
    template: `
    <div id="myToast" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true"
    *ngIf="toastContent">
        <div class="d-flex">
            <div class="toast-body">
                {{ toastContent.body }}
            </div>
            <!-- <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button> -->
        </div>
    </div>
  `,
    styles: `
    .toast {
        color: black;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
    }
    `
})
export class ToastComponent {
    #toastService = inject(ToastService);
    #toast$ = this.#toastService.toast$;

    toastContent = { body: '' };

    sub = this.#toast$.subscribe(res => {
        if (res) this.toastContent.body = res.body;
    });

    #myToastEl?: HTMLElement | null;
    #bsToast?: bootstrap.Toast;

    ngAfterViewInit() {
        this.#myToastEl = document.getElementById('myToast');
        this.#bsToast = bootstrap.Toast.getOrCreateInstance(<Element>this.#myToastEl);
        this.#bsToast.show();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
