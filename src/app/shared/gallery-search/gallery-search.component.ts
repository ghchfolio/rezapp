import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { GallerySearchService } from '../../services/gallery-search.service';
import { GalleryPageIsActiveService } from '../../services/gallery-page-is-active.service';

@Component({
    selector: 'app-gallery-search',
    standalone: true,
    imports: [FormsModule],
    template: `
    @if (isGalleryPage) {
        <form id="search" class="d-flex mb-2" role="search">
            <input id="term" name="term" class="form-control me-2 text-dark" type="text" placeholder="Search" aria-label="Search" class="form-control me-2"
            [ngModel]="term"
            (ngModelChange)="setSearchTerm($event)" />
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
    #gpia = inject(GalleryPageIsActiveService)

    #termSubj$ = new BehaviorSubject('');
    #allSubs = new Subscription();

    term = '';
    isGalleryPage = false;

    ngOnInit() {
        this.#allSubs.add(
            this.#gallerySearchService.getSearchTerm()
                .subscribe(term => this.term = term)
        );

        this.#allSubs.add(
            this.#gpia.isGalleryPage$
                .subscribe(isGalleryPg => this.isGalleryPage = isGalleryPg)
        );

        this.#allSubs.add(
            this.#termSubj$
                .pipe(
                    distinctUntilChanged(),
                    debounceTime(500)
                )
                .subscribe(term => this.#gallerySearchService.setSearchTerm(term))
        );
    }

    setSearchTerm(inputVal: string) {
        this.#termSubj$.next(inputVal);
    }

    onDestroy() {
        this.#allSubs.unsubscribe();
    }
}
