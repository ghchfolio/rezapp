import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GallerySearchService {
    #searchTermBSubj = new BehaviorSubject<string>('');
    searchTerm$ = this.#searchTermBSubj.asObservable();

    constructor() {
        this.setSearchTerm('');
    }

    setSearchTerm(term: string) {
        this.#searchTermBSubj.next(term);
    }

    getSearchTerm() {
        return this.#searchTermBSubj.asObservable();
    }
}
