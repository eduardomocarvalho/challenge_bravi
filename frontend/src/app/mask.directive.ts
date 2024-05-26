import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMask]'
})
export class MaskDirective {
  @Input('appMask') mask: string = '';

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove a máscara apenas se uma máscara for definida
    if (this.mask) {
      value = value.replace(/\D/g, '');

      if (this.mask === '(00) 0 0000-0000') {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{1})(\d{4})(\d)/, '$1 $2-$3');
      }
    }

    input.value = value;
    this.ngControl.control?.setValue(value);
  }
}
