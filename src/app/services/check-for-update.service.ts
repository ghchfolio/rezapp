import { ApplicationRef, Injectable, inject, isDevMode } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { ModalService } from './modal.service';
import { IModalProps } from '../models/modal-props.model';

@Injectable({
    providedIn: 'root'
})
export class CheckForUpdateService {
    #modalService = inject(ModalService);

    constructor(appRef: ApplicationRef, updates: SwUpdate) {
        // Allow app to stabilize first, before starting
        const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
        
        let hr = 1; // 1hr in prod env
        if (isDevMode() || window.location.toString().includes(':8080')) hr = 0.0125; // 0.0125 (40 secs) in dev env

        const myInterval$ = interval(hr * 60 * 60 * 1000);
        const myIntervalOnceAppIsStable$ = concat(appIsStable$, myInterval$);

        myIntervalOnceAppIsStable$.subscribe(async () => {
            try {
                const updateFound = await updates.checkForUpdate();

                if (isDevMode() || window.location.toString().includes(':8080')) {
                    console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
                }

                if (updateFound) {
                    const newAppVersioInfo: IModalProps = {
                        content: {
                            id: 1,
                            title: 'A New Version Is Available',
                            body: 'Do you want to reload the page now?',
                            cancelButtonLabel: 'No',
                            confirmButtonLabel: 'Yes'
                        },
                        confirmAction: function () { window.document.location.reload(); },
                        cancelAction: function () { return undefined }
                    }

                    this.#modalService.setModal(newAppVersioInfo);
                }
            } catch (err) {
                console.error('Failed to check for updates:', err);
            }
        });
    }
}
