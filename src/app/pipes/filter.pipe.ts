import { Pipe, PipeTransform, inject } from '@angular/core';
import { ISample } from '../models/sample.model';
import { GallerySearchService } from '../services/gallery-search.service';

@Pipe({
    name: 'searchFilter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    #gss = inject(GallerySearchService);
    arr: ISample[] = [];

    transform(samples: ISample[], term: string): ISample[] {
        if (typeof (term) !== 'string') {
            this.arr = [...samples];
        } else {
            this.arr = samples.filter(t => t.caption.toLowerCase().includes(term.toLowerCase()));
        }

        this.#gss.setGallerySearchCount(this.arr.length);

        return this.arr;
    }
}
