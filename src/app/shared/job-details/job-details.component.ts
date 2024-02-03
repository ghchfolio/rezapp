import { Component, Input } from '@angular/core';
import { IJobDetails } from '../../models/job-details.model';

@Component({
    selector: 'app-job-details',
    standalone: true,
    imports: [],
    template: `
    @if (jobDeets) {
<h3 class="mb-4 text-center text-uppercase">{{ jobDeets.header }}</h3>

<dl>
    <dt>Environment</dt>
    <dd>{{ jobDeets.environment }}</dd>
    <dt>Role</dt>
    <dd>{{ jobDeets.role }}</dd>
    <dt>Library/framework</dt>
    <dd>{{ jobDeets.libFramework }}</dd>
    <dt>Programs</dt>
    <dd>{{ jobDeets.programs }}</dd>
    <dt>Duties</dt>
    <dd>{{ jobDeets.duties }}</dd>
</dl>
}
  `,
    styles: `
  h3 { color: var(--accent2); }
  `
})
export class JobDetailsComponent {
    @Input() jobDeets?: IJobDetails;
}
