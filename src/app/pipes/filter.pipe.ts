import { Pipe, PipeTransform } from '@angular/core';
import { ISample } from '../models/sample.model';

@Pipe({
    name: 'searchFilter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(samples: ISample[], term: string): ISample[] {
        //check if term is undefined all types
        if (typeof (term) !== 'string') return samples;

        //return filtered types
        return samples.filter(t => t.caption.toLowerCase().includes(term.toLowerCase()));
    }
}
