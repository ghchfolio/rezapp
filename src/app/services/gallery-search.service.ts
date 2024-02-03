import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GallerySearchService {
    #searchTerm$ = new BehaviorSubject<string>('');

    constructor() {
        this.setSearchTerm('');
    }

    setSearchTerm(term: string) {
        this.#searchTerm$.next(term);
    }

    getSearchTerm() {
        return this.#searchTerm$.asObservable();
    }
}
