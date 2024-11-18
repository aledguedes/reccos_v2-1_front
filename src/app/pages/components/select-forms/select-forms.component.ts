import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-select-forms',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  templateUrl: './select-forms.component.html',
  styleUrl: './select-forms.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFormsComponent),
      multi: true,
    },
  ],
})
export class SelectFormsComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() id = '';
  @Input() options: { value: string; label: string }[] = [];
  @Input() isInvalid = false;

  value = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  onIput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(event: DropdownChangeEvent): void {
    const input = event.value;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
