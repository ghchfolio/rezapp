import { Pipe, PipeTransform, inject } from '@angular/core';
import { ISample } from '../models/sample.model';
import { GallerySearchService } from '../services/gallery-search.service';

@Pipe({
    name: 'searchFilter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    #gss = inject(GallerySearchService)

    transform(samples: ISample[], term: string): ISample[] {
        let arr: ISample[] = [];

        if (term === '') {
            arr = [...samples];
        } else {
            arr = samples.filter(t => t.caption.toLowerCase().includes(term.toLowerCase()));
        }

        this.#gss.setGallerySearchCount(arr.length);

        return arr;
    }
}
