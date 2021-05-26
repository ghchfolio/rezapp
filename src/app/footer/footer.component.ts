import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

   public date:any;
   public year = Number;

   constructor() { }

   ngOnInit() {
      this.date = new Date()
      this.year = this.date.getFullYear();
   }
}
