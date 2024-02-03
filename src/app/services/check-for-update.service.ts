import { ApplicationRef, Injectable, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { ModalService } from './modal.service';
import { IModalProps } from '../models/modal-props.model';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class CheckForUpdateService {
    // #modalService = inject(ModalService);

    // #modalProps: IModalProps = {
    //     content: {
    //         id: 1,
    //         title: 'New Version Of App Is Ready',
    //         body: 'Do you want to reload now?',
    //         cancelButtonLabel: 'No',
    //         confirmButtonLabel: 'Yes'
    //     },
    //     confirmAction: function () { window.document.location.reload(); },
    //     cancelAction: null
    // }

    constructor(appRef: ApplicationRef, updates: SwUpdate) {
        // Allow app to stabilize first, before starting
        const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
        const hr = (environment.production) ? 1 : 0.0125; // 1hr or 45 seconds
        const myInterval$ = interval(hr * 60 * 60 * 1000);
        const myIntervalOnceAppIsStable$ = concat(appIsStable$, myInterval$);

        myIntervalOnceAppIsStable$.subscribe(async () => {
            try {
                const updateFound = await updates.checkForUpdate();

                if (!environment.production) {
                    console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
                }

                if (updateFound) {
                    if (window.confirm('A new version is available.\nReload the page now?')) {
                        window.document.location.reload();
                    }
                }

                // if (updateFound) this.#modalService.setModal(this.#modalProps);
            } catch (err) {
                console.error('Failed to check for updates:', err);
            }
        });
    }
}
