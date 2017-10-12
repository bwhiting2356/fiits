import {Component, EventEmitter, Input, Output} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="alert alert-danger">
      {{ message }}
    </div>
  `,
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent  {
  @Input() message: string;

  @Output()
  clear = new EventEmitter();

  onClear() {
    this.clear.emit();
  }
}
