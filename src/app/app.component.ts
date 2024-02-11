import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaQueryService } from './services/media-query.service';
import { CheckForUpdateService } from './services/check-for-update.service';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ModalComponent } from './shared/modal/modal.component';
import { SideNavComponent } from "./shared/side-nav/side-nav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-header />
    <app-side-nav />

    <div id="container" class="container">
        <router-outlet />
    </div>

    <app-footer [appTitle]="appTitle" />

    <app-modal />
  `,
    styles: [],
    imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalComponent, SideNavComponent]
})
export class AppComponent {
    #cfus = inject(CheckForUpdateService);
    #mqs = inject(MediaQueryService);
    #router = inject(Router);

    #viewPortSub = new Subscription();

    appTitle = 'CHFolio';
    pgTitle = '';
    gradientBgEl?: Element | null;
    isSmallView?: boolean | null;

    ngAfterViewInit() {
        this.updatePgTitleAfterRouted();
        this.gradientBgEl = document.getElementById('gradientBg');
        this.#viewPortSub = this.#mqs.isSmallView$.subscribe(
            {
                next: (isSmall) => {
                    if (this.gradientBgEl) {
                        this.isSmallView = isSmall;

                        if (this.isSmallView) {
                            this.gradientBgEl.classList.remove('gradient-bg');
                            this.gradientBgEl.classList.add('gradient-bg-mobile');
                        } else {
                            this.gradientBgEl.classList.remove('gradient-bg-mobile');
                            this.gradientBgEl.classList.add('gradient-bg');
                        }
                    }
                }
            }
        );
    }

    private updatePgTitleAfterRouted() {
        this.#router.events.subscribe(event => {
            if ((event instanceof NavigationEnd)) window.scrollTo(0, 0);
        });
    }


    ngOnDestroy() {
        this.#viewPortSub.unsubscribe();
    }
}