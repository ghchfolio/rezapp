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
    imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalComponent],
    template: `
    <app-header />
    <app-side-nav />

    <div id="container" class="container">
        <router-outlet />
        <app-footer [appTitle]="appTitle" />
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
        const navBarEl = document.getElementById('navbarNav');

        this.#router.events.subscribe(event => {
            if ((event instanceof NavigationEnd)) {
                if (navBarEl !== null) this.setPageTitle(event.url.toString());
                window.scrollTo(0, 0);
            }
        });
    }

    private setPageTitle(str: string) {
        const arr: string[] = str.split('/');
        const title: string = arr[1];
        const titleArr: string[] = title.split('');

        if (titleArr[0] !== undefined) {
            titleArr[0] = titleArr[0].toUpperCase();
            this.pgTitle = titleArr.join('');
        }
    }

    ngOnDestroy() {
        this.#viewPortSub.unsubscribe();
    }
}