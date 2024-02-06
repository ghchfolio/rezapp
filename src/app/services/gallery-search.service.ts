import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GallerySearchService {
    #searchTermBSubj = new BehaviorSubject<string>('');
    searchTerm$ = this.#searchTermBSubj.asObservable();
    #gallerySearchCountBSubj = new BehaviorSubject(0);

    gallerySearchCount$ = this.#gallerySearchCountBSubj.asObservable();

    constructor() {
        this.setSearchTerm('');
    }

    setSearchTerm(term: string) {
        this.#searchTermBSubj.next(term);
    }

    getSearchTerm() {
        return this.#searchTermBSubj.asObservable();
    }

    setGallerySearchCount(cnt: number) {
        this.#gallerySearchCountBSubj.next(cnt);
    }
}
