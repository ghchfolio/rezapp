import { Component, Input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ISample } from '../../models/sample.model';

@Component({
    selector: 'app-gallery-thumbnails',
    standalone: true,
    imports: [NgClass],
    template: `
    @if(sample) {
        <figure class="text-center">
            <a (click)="onClick(sample.id)">
                <img src="{{ sample.src }}" alt="{{ sample.caption }}" title="{{ sample.caption }}" class="thumbs"
                    [ngClass]="sample.url === null && sample.images === null? 'unavailable' : ''" />
                <figcaption>{{ sample.caption }}</figcaption>
            </a>
        </figure>
    }
  `,
    styles: `
    figure:hover {
        cursor: pointer;
    }
    `
})
export class GalleryThumbnailsComponent {
    #router = inject(Router);

    @Input() sample?: ISample;

    onClick(id: number) {
        this.#router.navigate(['gallery/details/' + id]);
    }
}
