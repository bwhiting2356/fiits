import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-line',
  template: `<div class="horizontal-line"></div>`,
  styles: [`
    .horizontal-line {
      border-top: 1px solid grey;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class HorizontalLineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
