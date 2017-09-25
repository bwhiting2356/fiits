import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flash-message',
  template: `
    <div class="alert" [ngClass]="clazz">
      {{ message }}
    </div>
  `,
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent  {
  @Input() message: string;
  @Input() clazz: string;
}
