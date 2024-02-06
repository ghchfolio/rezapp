import { Component, inject } from '@angular/core';
import { GallerySearchService } from '../../services/gallery-search.service';

@Component({
    selector: 'app-gallery-search-result-count',
    standalone: true,
    imports: [],
    template: `
    <p class="text-center my-4">
        Matches Found: {{ matchedCount }}
    </p>
  `,
    styles: ``
})
export class GallerySearchResultCountComponent {
    #gscs = inject(GallerySearchService);
    #sub = this.#gscs.gallerySearchCount$
        .subscribe(cnt => {
            this.matchedCount = cnt;
        });

    matchedCount = 0;

    ngOnDestroy() {
        this.#sub.unsubscribe();
    }
}
