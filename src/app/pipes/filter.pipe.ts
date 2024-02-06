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
        if (typeof (term) !== 'string') return samples;

        const arr = samples.filter(t => t.caption.toLowerCase().includes(term.toLowerCase()));

        this.#gss.setGallerySearchCount(arr.length);

        return arr;
    }
}
