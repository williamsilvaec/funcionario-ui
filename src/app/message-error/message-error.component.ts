import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";

@Component({
  selector: 'app-message-error',
  template: `
    <div *ngIf="temErro()" class="p-error p-pt-1">
      {{ message }}
    </div>
  `
})
export class MessageErrorComponent implements OnInit {

  @Input() error!: string;
  @Input() control!: UntypedFormControl;
  @Input() message = 'Obrigatório(a)';

  constructor() { }

  ngOnInit(): void {
  }

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
