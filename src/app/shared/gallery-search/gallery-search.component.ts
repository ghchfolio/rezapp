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
        <form id="search" class="row g-3" role="search">
            <div class="col-lg-6">
                <input name="term" class="form-control text-dark bg-light" type="text" placeholder="Search" aria-label="Search"
                [ngModel]="term"
                (ngModelChange)="setSearchTerm($event)" />
            </div>
            <div class="col-lg-6">
                <button class="btn btn-primary w-100" type="reset" (click)="onReset()">Reset</button>
            </div>
        </form>
    }
  `,
    styles: `
    input::placeholder {
        color:gray;
    }
    `
})
export class GallerySearchComponent {
    #gallerySearchService = inject(GallerySearchService);
    #gpia = inject(GalleryPageIsActiveService);

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

    onReset() {
        this.setSearchTerm('');
    }

    onDestroy() {
        this.#allSubs.unsubscribe();
    }
}
