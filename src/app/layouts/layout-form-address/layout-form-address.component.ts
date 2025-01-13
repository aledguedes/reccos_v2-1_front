import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout-form-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './layout-form-address.component.html',
  styleUrl: './layout-form-address.component.scss',
})
export class LayoutFormAddressComponent {
  @Input() teams: {
    name: string;
    logo: string;
  }[] = [];
}
