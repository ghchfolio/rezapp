import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISample } from '../models/sample.model';
import { map } from 'rxjs/operators';
import { GallerySortService } from './gallery-sort.service';

@Injectable({
    providedIn: 'any'
})
export class SamplesService {
    #http = inject(HttpClient);
    #gallerySortService = inject(GallerySortService);

    #dataStore$ = this.#http.get<ISample[]>('./assets/samples.json')
        .pipe(
            map(data => {
                data.forEach((d, index) => d.id = (index + 1));
                return data;
            })
        );

    #sub = this.#dataStore$.
        subscribe({
            next: data => this.#gallerySortService.setDataSource(data)
        });

    ngOnDestroy() {
        this.#sub.unsubscribe();
    }
}
