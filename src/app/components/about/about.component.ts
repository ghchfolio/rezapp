import { Component } from '@angular/core';
import { VERSION } from '@angular/common';
import { BarComponent } from '../../shared/bar/bar.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [BarComponent],
    template: `
    <div class="row">
        <div class="col">
            <div class="card card-body dark-bg-tint">
                <p>I am an Angular UI Developer with .Net Core full stack experience with a background in Multimedia & Interactive Design. I also have (to a lesser extent) experience with ReactJS and SvlelteKit.
                </p>

                <!-- certs -->
                <dl>
                    <dt>Certificates</dt>
                    <dd>RxJS 101 (completed January 2024)</dd>
                    <dd>Express.js, Node.js & MongoDB (completed July 2022)</dd>
                    <dd>JavaScript Debugging Crash Course (completed July 2019)</dd>
                    <dd>Angular Progressive Web Apps Masterclass (completed June 2019)</dd>
                    <dd>JavaScript: Understanding the Weird Parts (completed June 2019)</dd>
                </dl>

                <app-bar class="my-4" />

                <div class="text-end mb-3">
                    <small>
                        <span class="badge ng-badge-bg">Angular {{ version.major }}</span>
                    </small>
                </div>
            </div>
        </div>
    </div>
  `,
    styles: `
    #nglogo {
        text-align: center;
    }

    #nglogo img {
        width: 1.2rem;
        height: auto;
        border: none;
    }

    .ng-badge-bg {
        background-color: #b5002b;
    }
    `
})
export class AboutComponent {
    version = VERSION;
}
