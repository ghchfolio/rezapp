import { Injectable } from '@angular/core';

declare var shapeFx: any;

@Injectable({
   providedIn: 'root'
 })

export class BackgroundFxService {

   _shapeFx: any;
   constructor() {
      this._shapeFx = shapeFx;
      console.log(shapeFx)
      // return this._shapeFx;
   }

   start() {
      this._shapeFx.start();
   }

   stop() {
      this._shapeFx.stop();
   }

   setParticleColors(val:any) {
      this._shapeFx.setParticleColors(val);
   }

   setBackground(val:any) {
      this._shapeFx.setBackground(val);
   }

}
