import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IExperience } from '../../models/experience.model';

@Component({
    selector: 'app-bar-item',
    standalone: true,
    imports: [NgStyle],
    template: `
    <div class="bar">
   <div class="bar-inner" [ngStyle]="{'width':barWidth}"></div>
   <div class="bar-info">
      <div class="bar-info-name">
         {{ obj.name }}
      </div>
      <div class="bar-info-years">
         {{ years }}</div>
   </div>
</div>
  `,
    styles: `
  .bar {
    margin-bottom: 10px;
    position: relative;
    line-height: 25px;
    height: 50px;
    border: 1px solid darkgray;
}

.bar-inner {
    position: absolute;
    box-sizing: border-box;
    background-color: var(--accent1);
    height: 48px;
}

.bar-info {
    position: absolute;
    padding: 10px;
    font-size: larger;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
}

.bar-info-name {
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.bar-info-years {
    width: 20%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: right;
}
  `
})
export class BarItemComponent {
    @Input('experience') obj!: IExperience;

    barWidth = '';
    years = '';

    ngOnInit() {
        this.barWidth = `${this.obj.years * 10}%`;
        if (this.obj.years > 7) {
            this.years = '7+ years';
        } else if (this.obj.years === 1) {
            this.years = '1 year';
        } else {
            this.years = `${this.obj.years} years`;
        }
    }
}
