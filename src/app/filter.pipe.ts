import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'searchFilter'
})
export class FilterPipe implements PipeTransform {

   transform(samples: any, term: any): any {

      //check if term is undefined all types
      if (term === undefined) return samples;

      //else return filtered types
      return samples.filter((t: any) => {

         if (
            t.caption.toLowerCase().includes(term.toLowerCase()) ||
            t.arsenal.toLowerCase().includes(term.toLowerCase()) ||
            t.year.toLowerCase().includes(term.toLowerCase()) ||
            t.comp.toLowerCase().includes(term.toLowerCase()) ||
            t.type.toLowerCase().includes(term.toLowerCase())
         ) {
            return t
         }

      })

   }

}
