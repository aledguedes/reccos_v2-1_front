import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DashStatisticsComponent } from '../dash-statistics/dash-statistics.component';

import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { HeaderComponent } from '../../pages/components/header/header.component';

const modules = [CardModule, ButtonModule, MessageModule, DividerModule];

const components = [HeaderComponent, DashStatisticsComponent];

@Component({
  selector: 'app-flexible-by-id',
  standalone: true,
  imports: [...modules, ...components],
  templateUrl: './flexible-by-id.component.html',
  styleUrl: './flexible-by-id.component.scss',
})
export class FlexibleByIdComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statistics: any[] = [];
}
