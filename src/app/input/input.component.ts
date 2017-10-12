import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() placeholderText: string;
  @Input() inputValue: string;
  @Input() type = 'text';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('input')
  public input: ElementRef;

  onXClick() {
    this.input.nativeElement.value = '';
    this.valueChange.emit('');
  }

  get showX() {
    return this.input.nativeElement.value.length > 0;
  }

  onChange($event) {
    this.valueChange.emit(this.input.nativeElement.value);
  }
}
