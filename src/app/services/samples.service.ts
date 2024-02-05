import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISample } from '../models/sample.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'any'
})
export class SamplesService {
    #http = inject(HttpClient);
    #dataStoreArr: ISample[] = [];
    samples$$ = signal(this.#dataStoreArr);

    #dataStore$ = this.#http.get<ISample[]>('./assets/samples.json')
        .pipe(
            map(data => {
                // add ids
                data.forEach((d, index) => d.id = (index + 1));
                return data;
            }),
            map(data => {
                // sort
                data.sort((a: ISample, b: ISample) => (a.year > b.year) ? -1 : 1);
                return data;
            })
        );

    #sub = this.#dataStore$.subscribe({
        next: data => {
            this.#dataStoreArr = data;
            this.samples$$.update(() => JSON.parse(JSON.stringify(this.#dataStoreArr)));
        }
    });

    ngOnDestroy() {
        this.#sub.unsubscribe();
    }
}
