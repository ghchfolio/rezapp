import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GallerySearchComponent } from "../gallery-search/gallery-search.component";

@Component({
    selector: 'app-side-nav',
    standalone: true,
    template: `
    <div class="offcanvas offcanvas-start nav-gradient-bg" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" data-bs-theme="dark">
        <div class="offcanvas-header">
            <div class="offcanvas-title" id="staticBackdropLabel">M E N U</div>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="offcanvas-body">
            <div>
               <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item mx-3 my-1">
                        <a class="nav-link" aria-current="page" routerLink="/home" routerLinkActive="active" ariaCurrentWhenActive="page" data-bs-dismiss="offcanvas">Home</a>
                    </li>
                    <li class="nav-item mx-3 my-1">
                        <a class="nav-link" routerLink="/gallery" routerLinkActive="active" ariaCurrentWhenActive="page" data-bs-dismiss="offcanvas">Gallery</a>
                    </li>
                    <li class="nav-item mx-3 my-1">
                        <a class="nav-link" routerLink="/about" routerLinkActive="active" ariaCurrentWhenActive="page" data-bs-dismiss="offcanvas">About</a>
                    </li>
                </ul>

                 <app-gallery-search />
            </div>
        </div>
    </div>
  `,
    styles: ``,
    imports: [RouterLink, RouterLinkActive, GallerySearchComponent]
})
export class SideNavComponent { }
