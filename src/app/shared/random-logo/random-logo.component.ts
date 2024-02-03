import { Component, ViewChild } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LoadComponentDirective } from '../../directives/load-component.directive';

@Component({
    selector: 'app-random-logo',
    standalone: true,
    imports: [LoadComponentDirective],
    template: `
    <div id="logos">
        <ng-template loadComponent></ng-template>
    </div>
  `,
    styles: `
    #logos {
        color: #555;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        width: 100px;
        height: 100px;
        margin: 0 auto 0 auto;
    }
  `
})
export class RandomLogoComponent {
    @ViewChild(LoadComponentDirective, { static: true })
    loadComponent!: LoadComponentDirective;

    ngOnInit(): void {
        const vcr = this.loadComponent.viewContainerRef;

        vcr.clear();
        vcr.createComponent<LogoComponent>(LogoComponent);
    }
}
