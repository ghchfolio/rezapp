import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SamplesService } from '../../services/samples.service';
import { ToastService } from '../../services/toast.service';
import { GallerySearchService } from '../../services/gallery-search.service';
import { GallerySortService } from '../../services/gallery-sort.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { GalleryThumbnailsComponent } from '../../shared/gallery-thumbnails/gallery-thumbnails.component';
import { ProjectUnavailableComponent } from '../../shared/project-unavailable/project-unavailable.component';
import { ToastComponent } from '../../shared/toast/toast.component';


@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [GalleryThumbnailsComponent, ToastComponent, FormsModule, ProjectUnavailableComponent, FilterPipe],
    template: `
    <app-toast />

    <div id="gallery">
        @for(sample of samples$$() | searchFilter:term; track sample.id) {
            <app-gallery-thumbnails [sample]="sample" />
        } @empty {
            <h2>No samples found...</h2>
        }
    </div>
  `,
    styles: `
    #search {
        background: #009eb3;
        position: fixed;
        top: 50px;
        left: 0;
        width: 100%;
        padding: 0.7em 0;
        text-align: center;
    }

    #search input[type=text] {
        width: 70%;
        margin: 0 auto;
        padding: 0.7em;
        border: none;
        border-radius: 4px;
        text-align: center;
    }

    #gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
        align-content: center;
    }

    .thumbs {
        border-radius: 500px;
        border: 5px solid #009eb3;
        width: 130px;
        height: 130px;
    }

    figure {
        width: 130px;
        text-align: center;
    }

    figure:hover {
        cursor: pointer;
    }

    figure a {
        text-decoration: none;
    }

    @media screen and (min-width: 768px) {
        #search input[type=text] {
            width: 40%;
        }
    }

    @media screen and (min-width: 1024px) {
        #search {
            top: 50px;
        }
    }

    @media screen and (min-width: 1440px) {
        #search input[type=text] {
            width: 20%;
        }
    }
  `
})
export class GalleryComponent {
    #samplesService = inject(SamplesService);
    #toastService = inject(ToastService);
    #gallerySearchService = inject(GallerySearchService);
    #gallerySortService = inject(GallerySortService);
    #searchSub = this.#gallerySearchService.getSearchTerm().subscribe(term => this.term = term)

    samples$$ = this.#gallerySortService.samples$$;
    type = 'all';
    term = '';

    ngOnInit() {
        this.#toastService.setToast({ body: 'Samples are sorted from latest to earliest.' });
    }

    ngOnDestroy() {
        this.#searchSub.unsubscribe();
    }
}
