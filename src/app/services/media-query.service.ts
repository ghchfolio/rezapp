import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MediaQueryService {
    #breakPoint = 1023; // laptop starts at 1024
    #mediaQueryList = window.matchMedia(`(max-width:${this.#breakPoint}px)`);
    #isSmallViewBSubj = new BehaviorSubject<boolean | null>(null);

    isSmallView$ = this.#isSmallViewBSubj.asObservable();

    constructor() {
        this.OnInit();
    }

    OnInit() {
        this.#mediaQueryList.addEventListener('change', () => {
            this.handleQueryChange();
        });

        // manually call the 1st time
        this.handleQueryChange();
    }

    private handleQueryChange() {
        if (this.#mediaQueryList.matches) {
            this.#isSmallViewBSubj.next(true);
        } else {
            this.#isSmallViewBSubj.next(false);
        }
    }
}
