import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISample } from '../models/sample.model';

@Injectable({
    providedIn: 'root'
})
export class GallerySortService {
    dataStore: ISample[] = [];
    sortDir: string = 'des';
    samples$$ = signal(this.dataStore);

    #sortDirSubj = new BehaviorSubject<string>(this.sortDir);
    #sortDir$ = this.#sortDirSubj.asObservable();

    subs = this.#sortDir$.subscribe(dir => {
        this.sortDir = dir;
        if (this.dataStore.length) this.sortByYear();
    });

    setSortDirection(sortDir: string) {
        this.#sortDirSubj.next(sortDir);
    }

    setDataSource(data: ISample[]) {
        if (data.length) {
            this.dataStore = data;
            this.sortByYear();
        }
    }

    sortByYear() {
        if (this.sortDir === 'des') {
            this.dataStore.sort(function (a: ISample, b: ISample) {
                if (a.year > b.year) return -1;
                if (b.year < a.year) return 1;
                return 0;
            });
        } else {
            this.dataStore.sort(function (a: ISample, b: ISample) {
                if (a.year < b.year) return -1;
                if (b.year > a.year) return 1;
                return 0;
            });
        }

        this.samples$$.update(() => JSON.parse(JSON.stringify(this.dataStore)));
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
