import { Component, computed, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SamplesService } from '../../services/samples.service';
import { ProjectUnavailableComponent } from '../project-unavailable/project-unavailable.component';
import { MediaQueryService } from '../../services/media-query.service';

@Component({
    selector: 'app-gallery-details',
    standalone: true,
    imports: [NgClass, ProjectUnavailableComponent],
    template: `
    <h2 class="text-center">{{ sample$$()?.caption }}</h2>

    <div class="row mt-5">
        <div class="col-lg-6">
            <figure class="text-center">
                <img src="{{ sample$$()?.src }}" alt="{{ sample$$()?.caption }}" title="{{ sample$$()?.caption }}"
                    class="thumbs" [ngClass]="!contentAvailable? 'unavailable' : ''" />
            </figure>
        </div>
        <div class="col-lg-6">
            <div class="card card-body dark-bg-tint">
                <p>{{ sample$$()?.desc }}</p>

                <ul class="min-list">
                    <li>Company: {{ sample$$()?.comp }}</li>
                    <li>Project Type: {{ sample$$()?.type }}</li>
                    <li>Stack: {{ sample$$()?.stack }}</li>
                </ul>

                @if (!contentAvailable) { <app-project-unavailable /> }
            </div>

        </div>
    </div>

    <!-- images -->
    @if (sample$$()?.images !== null) {
    <div class="row mt-5">
        <div class="col">
            @for (img of sample$$()?.images; track $index) {
            <figure class="text-center mb-5">
                <figcaption><small>{{ img.caption }}</small></figcaption>
                <img src="{{ img.url }}" alt="{{ img.caption }}" title="{{ img.caption }}" class="img-fluid scroll-fx" />
            </figure>
            }
        </div>
    </div>
    }

    <!-- buttons  -->
    @if (id$$()>0) {
    <div class="row mt-5">
        <div class="col text-center">
            <!-- prev btn -->
            <button class="btn btn-light" [disabled]="id$$() <= 1" (click)="onPrev()"
            [ngClass]="{'btn-lg':isSmallView}">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>

            <!-- go btn -->
            <button class="btn btn-light fw-bold mx-4" [disabled]="!contentAvailable" (click)="onGo()"
            [ngClass]="{'btn-lg':isSmallView}">GO</button>

            <!-- next btn -->
            <button class="btn btn-light" [disabled]="id$$() >= samples$$().length" (click)="onNext()"
            [ngClass]="{'btn-lg':isSmallView}">
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    </div>
}
  `,
    styles: `
    @media(prefers-reduced-motion:no-preference) {
        .scroll-fx {
            animation: fade linear;
            animation-timeline: view();
            animation-range: entry;
            animation-range-end: 12.5rem;
        }

        @keyframes fade {
            from {
                opacity: 0;
                scale: .10;
            }

            to {
                opacity: 1;
                scale: 1;
            }
        }
    }
  `
})
export class GalleryDetailsComponent {
    #route = inject(ActivatedRoute);
    #router = inject(Router);
    #samplesService = inject(SamplesService);
    #mqs = inject(MediaQueryService);
    #allSubs = new Subscription();

    contentAvailable = false;
    isSmallView: boolean | null = false;

    id$$ = signal(0);
    samples$$ = this.#samplesService.samples$$;
    sample$$ = computed(() => this.updateSample());

    ngOnInit() {
        this.#allSubs.add(
            this.#route.params.subscribe(params => this.id$$.set(+params['id']))
        );

        this.#allSubs.add(
            this.#mqs.isSmallView$
                .subscribe(isSmallView => this.isSmallView = isSmallView)
        );
    }

    onNext() {
        this.#router.navigate(['/gallery/details', this.id$$() + 1]);
    }

    onGo() {
        let str = (this.sample$$()?.url)?.toString();
        window.open(str, 'rezappWin');
    }

    onPrev() {
        this.#router.navigate(['/gallery/details', this.id$$() - 1]);
    }

    protected updateSample() {
        let samp;

        this.contentAvailable = false;

        if (this.samples$$().length > 0) samp = this.samples$$().find((obj) => obj.id === this.id$$());
        if (samp && samp.url !== null) this.contentAvailable = true;

        return samp;
    }

    ngOnDestroy() {
        this.#allSubs.unsubscribe();
    }
}
