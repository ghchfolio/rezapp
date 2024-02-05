import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ServerRequestService } from '../../services/server-request.service';
import { GallerySearchComponent } from '../gallery-search/gallery-search.component';
import { FilterPipe } from '../../pipes/filter.pipe';
import * as bootstrap from 'bootstrap';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [GallerySearchComponent, FilterPipe, NgClass, RouterLink, RouterLinkActive],
    template: `
    <nav id="navbar" class="navbar fixed-top navbar-expand-lg"
    [ngClass]="isLoading? 'nav-progress-bg': 'nav-gradient-bg'" data-bs-theme="dark">
        <div class="container">
            <a class="navbar-brand" href="#">C H F O L I O</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop" aria-expanded="false"  id="navbarBtn">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarLinks">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item mx-3 my-1">
                        <a class="nav-link" aria-current="page" routerLink="/home" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a>
                    </li>
                    <li class="nav-item mx-3 my-1">
                        <a class="nav-link" routerLink="/gallery" routerLinkActive="active" ariaCurrentWhenActive="page">Gallery</a>
                    </li>
                    <li class="nav-item mx-3 my-1">
                        <a class="nav-link" routerLink="/about" routerLinkActive="active" ariaCurrentWhenActive="page">About</a>
                    </li>
                </ul>

                <app-gallery-search />
            </div>
        </div>
    </nav>
  `,
    styles: `
    .nav-gradient-bg {
        background: rgb(0, 158, 179);
        background: linear-gradient(45deg, var(--accent1) 45%, var(--accent2) 100%);
    }

    .nav-progress-bg {
        background-image:repeating-linear-gradient(-45deg, var(--accent1) 0px, var(--accent1) 20px, #ba094a 20px, #ba094a 40px);
        background-size: 200% 100%;
        animation: barberpole 20s linear infinite;
    }

    @keyframes barberpole {
        100% {
            background-position: 100% 100%;
        }
    }
    `
})
export class HeaderComponent {
    #serverReqService = inject(ServerRequestService);

    isLoading$ = this.#serverReqService.isLoading$;
    isLoading = false;
    sub = this.isLoading$.subscribe(res => this.isLoading = res);

    ngAfterViewInit() {
        const navbarLinks: any = document.getElementById('navbarLinks');
        const bodyEl = document.getElementsByTagName('body')[0];

        const navLinksEl = document.querySelectorAll('.nav-item');
        const menuToggle: any = document.getElementById('navbarLinks');
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

        navLinksEl.forEach((el) => {
            el.addEventListener('click', () => bsCollapse.toggle());
        });

        bodyEl.addEventListener('click', (evt: any) => {
            if (navbarLinks.classList.contains('show') && evt.target.nodeName !== 'INPUT') {
                bsCollapse.toggle();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
