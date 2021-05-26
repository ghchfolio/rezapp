import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SamplesService } from '../samples.service';
// import { BackgroundFxService } from '../background-fx.service';

@Component({
   selector: 'app-gallery',
   templateUrl: './gallery.component.html',
   styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {

   samples: any;
   type = 'all';
   term: any;
   content_available = false;

   // constructor(private _samples_service: SamplesService, private router: Router, private bgfxService: BackgroundFxService) {
   // }
   constructor(private _samples_service: SamplesService, private router: Router) {
   }

   getSamples() {
      this._samples_service.getSamples().subscribe((server_data: any) => { this.samples = server_data });
   }

   navigateTo(id: any) {
      this.router.navigate(['gallery/details/' + id]);
   }

   ngOnInit() {
      // this.bgfxService.setParticleColors(['#b3f6ff', '#00cbe6']);
      this.getSamples();
   }

}
//https://www.thepolyglotdeveloper.com/2016/11/navigating-web-application-angular-2-router/
