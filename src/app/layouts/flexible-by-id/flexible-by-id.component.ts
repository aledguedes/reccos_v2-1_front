import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DashStatisticsComponent } from '../dash-statistics/dash-statistics.component';

import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';

interface IStatisticsCards {
  label: string;
  value: string;
  icon: string;
  redux: boolean;
  isImage: boolean;
}

const modules = [CardModule, ButtonModule, MessageModule, DividerModule];

const components = [DashStatisticsComponent];

@Component({
  selector: 'app-flexible-by-id',
  standalone: true,
  imports: [...modules, ...components],
  templateUrl: './flexible-by-id.component.html',
  styleUrl: './flexible-by-id.component.scss',
})
export class FlexibleByIdComponent {
  statistics: IStatisticsCards[] = [
    {
      label: 'Total de Times',
      value: '20',
      icon: 'ri-user-3-line',
      redux: false,
      isImage: false,
    },
    {
      label: 'Média de Gols',
      value: '2.8',
      icon: 'ri-line-chart-fill',
      redux: false,
      isImage: false,
    },
    {
      label: 'Partidas Realizadas',
      value: '240',
      icon: 'ri-calendar-line',
      redux: false,
      isImage: false,
    },
    {
      label: 'Gols Marcados',
      value: '672',
      icon: 'ri-football-fill',
      redux: false,
      isImage: false,
    },
  ];

  teams = [
    {
      name: 'Palmeiras',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/180px-Palmeiras_logo.svg.png',
    },
    {
      name: 'Flamengo',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/180px-Flamengo_braz_logo.svg.png',
    },
    {
      name: 'Arsenal',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png',
    },
    {
      name: 'Manchester City',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/0/02/Manchester_City_Football_Club.png',
    },
  ];

  rankings = [
    {
      label: 'Artilheiros',
      values: [
        {
          position: 1,
          name: 'Pedro',
          value: '15 gols',
          image: this.teams[1].logo,
        },
        {
          position: 2,
          name: 'Endrick',
          value: '12 gols',
          image: this.teams[0].logo,
        },
        {
          position: 3,
          name: 'Halland',
          value: '10 gols',
          image: this.teams[3].logo,
        },
        {
          position: 4,
          name: 'Martinelli',
          value: '8 gols',
          image: this.teams[2].logo,
        },
      ],
    },
    {
      label: 'Melhores Ataques',
      values: [
        {
          position: 1,
          name: 'Palmeiras',
          value: '45 gols',
          image: this.teams[0].logo,
        },
        {
          position: 2,
          name: 'Flamengo',
          value: '42 gols',
          image: this.teams[1].logo,
        },
        {
          position: 3,
          name: 'Arsenal',
          value: '35 gols',
          image: this.teams[2].logo,
        },
        {
          position: 4,
          name: 'Manchester City',
          value: '22 gols',
          image: this.teams[3].logo,
        },
      ],
    },
    {
      label: 'Melhores Defesas',
      values: [
        {
          position: 1,
          name: 'Flamengo',
          value: '8 gols',
          image: this.teams[1].logo,
        },
        {
          position: 2,
          name: 'Palmeiras',
          value: '12 gols',
          image: this.teams[0].logo,
        },
        {
          position: 3,
          name: 'Arsenal',
          value: '15 gols',
          image: this.teams[2].logo,
        },
        {
          position: 4,
          name: 'Manchester City',
          value: '22 gols',
          image: this.teams[3].logo,
        },
      ],
    },
  ];
}
