import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { GallerySearchService } from '../../services/gallery-search.service';
import { GallerySortService } from '../../services/gallery-sort.service';

@Component({
    selector: 'app-gallery-search',
    standalone: true,
    imports: [FormsModule],
    template: `
    @if (isGalleryPage) {
        <form id="search" class="d-flex mb-2" role="search">
            <input id="term" (keyup)="setSearchTerm($event)" class="form-control me-2 text-dark" type="text" placeholder="Search"
                aria-label="Search" class="form-control me-2" />
        </form>
    }
  `,
    styles: `
    #term {
        background-color:white;
        color:black;
    }
    input::placeholder {
        color:gray;
    }
    `
})
export class GallerySearchComponent {
    #gallerSortService = inject(GallerySortService);
    #gallerySearchService = inject(GallerySearchService);
    #router = inject(Router);
    #subs = new Subscription();

    type = 'all';
    term = '';
    isGalleryPage = false;
    sortDir = 'des';

    ngOnInit() {
        this.#subs.add(this.#gallerySearchService.getSearchTerm().subscribe(term => this.term = term));

        this.#subs.add(this.#router.events
            .subscribe((event: NavigationEvent) => {
                if (event instanceof NavigationStart) this.isGalleryPage = (event.url === '/gallery');
            })
        );

        document.getElementById('term')?.focus();
    }

    setSearchTerm(evt: KeyboardEvent | null) {
        const term: string = (evt?.target as HTMLInputElement).value;
        this.#gallerySearchService.setSearchTerm(term);
    }

    sortDirection() {
        this.#gallerSortService.setSortDirection(this.sortDir);
    }

    onDestroy() {
        this.#subs.unsubscribe();
    }
}
