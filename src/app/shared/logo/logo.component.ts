import { Component, inject } from '@angular/core';
import { LogosService } from '../../services/logos.service';
import { ILogo } from '../../models/logo.model';


@Component({
    selector: 'app-logo',
    standalone: true,
    imports: [],
    template: `
     @if (isReady) {
<div class="logo" [style.background-image]="'url(' + logo.src + ')'" [title]="logo.title"></div>
} @else {
<div>...</div>
}
  `,
    styles: `
    .logo {
    width: 80px;
    height: 80px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
    `
})
export class LogoComponent {
    #ls = inject(LogosService);

    #index = 0;
    #loadedLogosArr: ILogo[] = [];
    #logoInterval?: ReturnType<typeof setTimeout>;

    isReady = false;
    logo: ILogo = { title: '', src: '' };

    #logosReadySub = this.#ls.logosReady$.subscribe({
        next: (logosReady) => {
            this.isReady = logosReady;
            if (this.isReady) {
                this.#loadedLogosArr = this.#ls.getLoadedLogos();
                this.#displayLogos();
            }
        }
    });

    #displayLogos() {
        this.logo = this.#loadedLogosArr[this.#index];
        this.#logoInterval = setInterval(() => {
            (this.#index + 1 === this.#loadedLogosArr.length) ? this.#index = 0 : this.#index++;
            this.logo = this.#loadedLogosArr[this.#index];
        }, 3000);
    }

    ngOnDestroy() {
        clearInterval(this.#logoInterval);
        this.#logosReadySub.unsubscribe();
    }
}
