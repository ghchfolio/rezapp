import { Component } from '@angular/core';
import { BackgroundFxService } from '../background-fx.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private bgfxService: BackgroundFxService) {}
  
  ngOnInit() { 
    this.bgfxService.start();
    this.bgfxService.setParticleColors(['#dddddd']);
  }

}
