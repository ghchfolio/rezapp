import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GallerySearchComponent } from "../gallery-search/gallery-search.component";
import { GallerySearchResultCountComponent } from "../gallery-search-result-count/gallery-search-result-count.component";

@Component({
    selector: 'app-side-nav',
    standalone: true,
    template: `
    <div class="offcanvas offcanvas-start nav-gradient-bg" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" data-bs-theme="dark">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="staticBackdropLabel">M E N U</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="offcanvas-body">
            <div>
               <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item mx-3 my-3">
                        <a class="nav-link fs-3" aria-current="page" routerLink="/home" routerLinkActive="active" ariaCurrentWhenActive="page" data-bs-dismiss="offcanvas">Home</a>
                    </li>
                    <li class="nav-item mx-3 my-3">
                        <a class="nav-link fs-3" routerLink="/gallery" routerLinkActive="active" ariaCurrentWhenActive="page" data-bs-dismiss="offcanvas">Gallery</a>
                    </li>
                    <li class="nav-item mx-3 my-3">
                        <a class="nav-link fs-3" routerLink="/about" routerLinkActive="active" ariaCurrentWhenActive="page" data-bs-dismiss="offcanvas">About</a>
                    </li>
                </ul>

                 <app-gallery-search />

                <div class="row mt-5">
                    <div class="col text-center">
                        <button type="button" class="btn btn-primary btn-lg w-50" data-bs-dismiss="offcanvas" aria-label="Close">Close</button>
                    </div>
                </div>

                 <app-gallery-search-result-count />
            </div>
        </div>
    </div>
  `,
    styles: ``,
    imports: [RouterLink, RouterLinkActive, GallerySearchComponent, GallerySearchResultCountComponent]
})
export class SideNavComponent { }
