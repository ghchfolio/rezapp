import { Component } from '@angular/core';
import { BackgroundFxService } from '../background-fx.service'

@Component({
   selector: 'app-about',
   templateUrl: './about.component.html',
   styleUrls: ['./about.component.css']
})
export class AboutComponent {

   constructor(private bgfxService: BackgroundFxService) {}

   ngOnInit() {
      this.bgfxService.setParticleColors(['#f9d2e0', '#f7bbd1', '#d81b60']);
   }

}
