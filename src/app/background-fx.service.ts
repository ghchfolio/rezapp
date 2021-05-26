import { Injectable } from '@angular/core';

declare var BackgroundFx: any;

@Injectable({
   providedIn: 'root'
 })

export class BackgroundFxService {

   fx: any;
   constructor() {
      this.fx = new BackgroundFx();
   }

   start() {
      this.fx.start();
   }

   stop() {
      this.fx.stop();
   }

   setParticleColors(val:any) {
      this.fx.setParticleColors(val);
   }

   setBackground(val:any) {
      this.fx.setBackground(val);
   }

}
