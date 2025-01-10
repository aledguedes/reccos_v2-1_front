import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../layouts/base-layout/base-layout.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [BaseLayoutComponent],
  template: `<app-base-layout />`,
})
export class RefreeRouterComponent {}
