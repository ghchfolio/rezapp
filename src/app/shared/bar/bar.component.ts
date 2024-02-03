import { Component, ViewChild } from '@angular/core';
import { IExperience, experience } from '../../models/experience.model';
import { LoadComponentDirective } from '../../directives/load-component.directive';
import { BarItemComponent } from '../bar-item/bar-item.component';

@Component({
    selector: 'app-bar',
    standalone: true,
    imports: [BarItemComponent, LoadComponentDirective],
    template: `
    <ng-template loadComponent></ng-template>
  `,
    styles: ``
})
export class BarComponent {
    experience = experience;

    @ViewChild(LoadComponentDirective, { static: true })
    loadComponent!: LoadComponentDirective;

    ngOnInit() {
        const vcr = this.loadComponent.viewContainerRef;

        vcr.clear();

        this.experience.forEach((logo: IExperience) => {
            let newComponent = vcr.createComponent<BarItemComponent>(BarItemComponent);

            newComponent.instance.obj = logo;
        })
    }
}