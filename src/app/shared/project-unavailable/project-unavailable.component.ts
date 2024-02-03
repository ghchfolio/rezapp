import { Component } from '@angular/core';

@Component({
    selector: 'app-project-unavailable',
    standalone: true,
    imports: [],
    template: `
   <div class="alert alert-warning text-center" role="alert">
    This project is unavailable.
</div>
  `,
    styles: ``
})
export class ProjectUnavailableComponent {

}
