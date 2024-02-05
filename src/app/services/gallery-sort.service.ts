import { Injectable, signal } from '@angular/core';
import { ISample } from '../models/sample.model';

@Injectable({
    providedIn: 'root'
})
export class GallerySortService {
    #dataStore: ISample[] = [];
    samples$$ = signal(this.#dataStore);

    setDataSource(data: ISample[]) {
        if (data.length) {
            this.#dataStore = data.sort((a: ISample, b: ISample) => (a.year > b.year) ? -1 : 1);
            this.samples$$.update(() => JSON.parse(JSON.stringify(this.#dataStore)));
        }
    }
}
