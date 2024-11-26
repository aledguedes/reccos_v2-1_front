import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-flexible-by-id',
  standalone: true,
  imports: [CardModule],
  templateUrl: './flexible-by-id.component.html',
  styleUrl: './flexible-by-id.component.scss',
})
export class FlexibleByIdComponent {}
