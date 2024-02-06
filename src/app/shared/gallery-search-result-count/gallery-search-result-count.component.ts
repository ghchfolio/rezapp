import { Component, inject } from '@angular/core';
import { GallerySearchService } from '../../services/gallery-search.service';
import { GalleryPageIsActiveService } from '../../services/gallery-page-is-active.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-gallery-search-result-count',
    standalone: true,
    imports: [],
    template: `
    @if (isGalleryPage) {
        <p class="text-center fs-5 my-4">
            Matches Found: {{ matchedCount }}
        </p>
    }
  `,
    styles: ``
})
export class GallerySearchResultCountComponent {
    #gscs = inject(GallerySearchService);
    #gpia = inject(GalleryPageIsActiveService);

    #allSubs = new Subscription();

    isGalleryPage = false;
    matchedCount = 0;

    ngOnInit() {
        this.#allSubs.add(
            this.#gscs.gallerySearchCount$
                .subscribe(cnt => this.matchedCount = cnt)
        );

        this.#allSubs.add(
            this.#gpia.isGalleryPage$
                .subscribe(isGalleryPg => this.isGalleryPage = isGalleryPg)
        );
    }

    ngOnDestroy() {
        this.#allSubs.unsubscribe();
    }
}
