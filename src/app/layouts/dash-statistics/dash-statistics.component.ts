import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

interface IStatisticsCards {
  label: string;
  value: string;
  icon: string;
  redux: boolean;
  isImage: boolean;
}
const components = [CardModule, CardModule];
const modules = [NgClass];
@Component({
  selector: 'app-dash-statistics',
  standalone: true,
  imports: [...components, ...modules],
  templateUrl: './dash-statistics.component.html',
  styleUrl: './dash-statistics.component.scss',
})
export class DashStatisticsComponent {
  @Input() data: IStatisticsCards = {
    label: '',
    value: '',
    icon: '',
    redux: false,
    isImage: false,
  };
}
