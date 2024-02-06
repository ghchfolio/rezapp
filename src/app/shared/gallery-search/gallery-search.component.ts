import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { GallerySearchService } from '../../services/gallery-search.service';

@Component({
    selector: 'app-gallery-search',
    standalone: true,
    imports: [FormsModule],
    template: `
    @if (isGalleryPage) {
        <form id="search" class="d-flex mb-2" role="search">
            <input id="term" (keyup)="setSearchTerm($event)" class="form-control me-2 text-dark" type="text" placeholder="Search" [value]="term"
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
    #gallerySearchService = inject(GallerySearchService);
    #router = inject(Router);
    #subs = new Subscription();

    term = '';
    isGalleryPage = false;

    ngOnInit() {
        this.#subs.add(this.#gallerySearchService.getSearchTerm().subscribe(term => this.term = term));

        this.#subs.add(this.#router.events
            .subscribe((event: NavigationEvent) => {
                if (event instanceof NavigationStart) this.isGalleryPage = (event.url === '/gallery');
            })
        );
    }

    setSearchTerm(evt: KeyboardEvent | null) {
        const term = (evt?.target as HTMLInputElement).value;

        this.#gallerySearchService.setSearchTerm(term);
    }

    onDestroy() {
        this.#subs.unsubscribe();
    }
}
