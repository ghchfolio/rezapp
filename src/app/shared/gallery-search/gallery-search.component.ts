import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { GallerySearchService } from '../../services/gallery-search.service';
import { GalleryPageIsActiveService } from '../../services/gallery-page-is-active.service';
import { MediaQueryService } from '../../services/media-query.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-gallery-search',
    standalone: true,
    imports: [FormsModule, NgClass],
    template: `
    @if (isGalleryPage) {
        <form id="search" class="row g-3" role="search">
            <div class="col-lg-6">
                <input name="term" class="form-control text-dark bg-light" type="text" placeholder="Search" aria-label="Search"
                [ngModel]="term"
                [ngClass]="{'form-control-lg':isSmallView}"
                (ngModelChange)="setSearchTerm($event)" />
            </div>
            <div class="col-lg-6">
                <div class="text-center mt-2 mt-lg-0">
                    <button class="btn btn-light w-100" type="reset" (click)="onReset()"
                    [ngClass]="{'btn-lg':isSmallView}">Reset</button>
                </div>
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
    #gss = inject(GallerySearchService);
    #mqs = inject(MediaQueryService);
    #gpias = inject(GalleryPageIsActiveService);

    #termSubj$ = new BehaviorSubject('');
    #allSubs = new Subscription();

    term = '';
    isGalleryPage = false;
    isSmallView: boolean | null = false;

    ngOnInit() {
        this.#allSubs.add(
            this.#gss.getSearchTerm()
                .subscribe(term => this.term = term)
        );

        this.#allSubs.add(
            this.#gpias.isGalleryPage$
                .subscribe(isGalleryPg => this.isGalleryPage = isGalleryPg)
        );

        this.#allSubs.add(
            this.#termSubj$
                .pipe(
                    distinctUntilChanged(),
                    debounceTime(500)
                )
                .subscribe(term => this.#gss.setSearchTerm(term))
        );

        this.#allSubs.add(
            this.#mqs.isSmallView$
                .subscribe(isSmallView => this.isSmallView = isSmallView)
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
