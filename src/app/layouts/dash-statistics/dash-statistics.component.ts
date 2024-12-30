import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

interface IStatisticsCards {
  label: string;
  value: string;
  icon: string;
  redux: boolean;
}

@Component({
  selector: 'app-dash-statistics',
  standalone: true,
  imports: [CardModule, NgClass],
  templateUrl: './dash-statistics.component.html',
  styleUrl: './dash-statistics.component.scss',
})
export class DashStatisticsComponent {
  @Input() data: IStatisticsCards = {
    label: '',
    value: '',
    icon: '',
    redux: false,
  };
}
