import { Injectable, inject } from '@angular/core';
import { NavigationStart, Event as NavigationEvent, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GalleryPageIsActiveService {
    #router = inject(Router);
    #isGalleryPageBSubj = new BehaviorSubject(false);

    isGalleryPage$ = this.#isGalleryPageBSubj.asObservable();

    constructor() {
        this.#router.events
            .subscribe((event: NavigationEvent) => {
                if (event instanceof NavigationStart) this.#isGalleryPageBSubj.next(event.url === '/gallery');
            });
    }
}
