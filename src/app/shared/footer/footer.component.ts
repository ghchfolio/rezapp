import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [],
    template: `
    <footer class="text-center mt-5">&copy; {{ year }} {{ appTitle }}</footer>
  `,
    styles: `
    footer { font-size: small; }
    `
})
export class FooterComponent {
    @Input() appTitle = '';

    public date?: Date;
    public year?: number;

    ngOnInit() {
        this.date = new Date()
        this.year = this.date.getFullYear();
    }
}
