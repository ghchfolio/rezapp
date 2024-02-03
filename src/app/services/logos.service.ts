import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ILogo } from '../models/logo.model';

@Injectable({
    providedIn: 'root'
})
export class LogosService {
    #logos: ILogo[] = [
        { title: 'HTML5 logo', src: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
        { title: 'CSS3 logo', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
        { title: 'JQuery logo', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/JQuery-Logo.svg' },
        { title: 'JavaScript logo', src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg' },
        { title: 'BootStrap logo', src: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg' },
        { title: 'Sass logo', src: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg' },
        { title: 'LESS logo', src: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LESS_Logo.svg' },
        { title: 'TypeScript logo', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
        { title: 'Angular logo', src: 'https://angular.io/assets/images/logos/angular/angular.svg' },
        { title: 'AngularJS logo', src: 'https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg' },
        { title: 'ReactJS logo', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
        { title: 'RxJS logo', src: 'https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png' },
        { title: 'ParcelJS logo', src: 'assets/parceljs.png' },
        { title: 'Workbox logo', src: 'https://cdn.worldvectorlogo.com/logos/workbox-1.svg' },
        { title: 'Electron logo', src: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg' },
        { title: 'Git logo', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg' },
        { title: 'NodeJS logo', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
        { title: 'PHP logo', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/512px-PHP-logo.svg.png' },
        { title: 'Firebase logo', src: 'assets/firebase.svg' },
        { title: 'mongo DB', src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg' },
    ];

    #loadedLogosArr: HTMLImageElement[] = [];

    #logosReadyBSubj = new BehaviorSubject(false);
    logosReady$ = this.#logosReadyBSubj.asObservable();

    constructor() {
        this.#loadLogos();
    }

    #loadLogos() {
        const promisesArr: Promise<number>[] = [];

        // put the successfully loaded images into loadedLogosArr.
        this.#logos.forEach((logo: ILogo) => {
            const p = new Promise((res, rej) => {
                const img: HTMLImageElement = new Image(100, 100);

                img.title = logo.title;
                img.src = logo.src;
                img.onload = () => res(img);
                img.onerror = () => rej();
            })
                .then((img) => this.#loadedLogosArr.push(<HTMLImageElement>img));

            promisesArr.push(p);
        });

        // successful or not, once all promises are settled start displaying the 'good' ones
        Promise.allSettled(promisesArr)
            .then(() => {
                if (this.#loadedLogosArr.length > 0) this.#logosReadyBSubj.next(true);
            });
    }

    getLoadedLogos() {
        return this.#loadedLogosArr;
    }
}
