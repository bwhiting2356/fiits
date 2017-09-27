import {Component, EventEmitter, Input, Output} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-flash-message',
  template: `
    <div class="alert alert-dismissable" [ngClass]="clazz" [@slideIn]="state">
      {{ message }}
      <span class="glyphicon glyphicon-remove" (click)="onClear()"></span>
    </div>
  `,
  styleUrls: ['./flash-message.component.scss'],
  animations: [
    trigger('slideIn', [
      state('active', style({
        marginTop: '0',
        opacity: '1'
      })),
      state('void', style({
        marginTop: '-100px',
        opacity: '0'
      })),
      transition('* => *', [
        animate('300ms ease-in')
      ]),
    ])

    // TODO: why doesn't the animation work when I delete the message?
  ]
})
export class FlashMessageComponent  {
  @Input() message: string;
  @Input() clazz: string;
  state = 'active';

  @Output()
  clear = new EventEmitter();

  onClear() {
    this.clear.emit();
  }
}
