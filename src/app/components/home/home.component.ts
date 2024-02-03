import { Component } from '@angular/core';
import { JobDetailsComponent } from '../../shared/job-details/job-details.component';
import { IJobDetails } from '../../models/job-details.model';
import { RandomLogoComponent } from '../../shared/random-logo/random-logo.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [JobDetailsComponent, RandomLogoComponent],
    template: `
    <div class="row mb-5">
    <div class="col text-center">
        <app-random-logo />
    </div>
</div>

<!-- history -->
<div class="row">
    <div class="col">
        <div class="d-flex flex-column flex-md-row gap-3">
            <div class="card card-body dark-bg-tint" style="flex:1;">
                <app-job-details [jobDeets]="currentJobDeets" />
            </div>

            <div class="card card-body dark-bg-tint" style="flex:1;">
                <app-job-details [jobDeets]="previousJobDeets" />
            </div>
        </div>
    </div>
</div>
  `,
    styles: ``
})
export class HomeComponent {
    currentJobDeets: IJobDetails = {
        header: 'Currently',
        environment: '.Net, JIRA, Git',
        role: 'UI Developer',
        libFramework: 'Angular 15, ngx-translate, ng-bootstrap, BootStrap 5, Figma, JQuery, SASS, jsPDF, ChartJS, KendoUI, PrimeNG, DataTables, Razor',
        programs: 'Visual Studio Code, Visual Studio, Blender 3D',
        duties: 'Upgrade project from Angular v13 to v15, create prototype for localization, create prototype and help build dashboard with ChartJS and Angular'
    };

    previousJobDeets: IJobDetails = {
        header: 'Previously',
        environment: '.Net, Azure DevOps, Git',
        role: 'Software Engineer/UI Developer',
        libFramework: 'Angular 8, 12, BootStrap 4, JQuery, SASS',
        programs: 'Visual Studio Code',
        duties: 'Converted high fideltiy mocks to responsive and A11y compliant web pages'
    };
}
