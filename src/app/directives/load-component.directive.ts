import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[loadComponent]',
    standalone: true
})
export class LoadComponentDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
