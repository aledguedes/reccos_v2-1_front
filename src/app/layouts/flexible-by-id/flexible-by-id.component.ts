import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DashStatisticsComponent } from '../dash-statistics/dash-statistics.component';

import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { LayoutFormAddressComponent } from '../layout-form-address/layout-form-address.component';

interface IStatisticsCards {
  label: string;
  value: string;
  icon: string;
  redux: boolean;
  isImage: boolean;
}

const modules = [CardModule, ButtonModule, MessageModule, DividerModule];

const components = [DashStatisticsComponent, LayoutFormAddressComponent];

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
      label: 'Média de',
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

  teams: {
    name: string;
    logo: string;
  }[] = [
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
    {
      name: 'Chelsea',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
    },
    {
      name: 'Liverpool',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/0/0c/Liverpool_FC.svg/800px-Liverpool_FC.svg.png',
    },
    {
      name: 'Manchester United',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
    },
    {
      name: 'Tottenham Hotspur',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/6/6d/Tottenham_Hotspur.png',
    },
    {
      name: 'Barcelona',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/4/43/FCBarcelona.svg/800px-FCBarcelona.svg.png',
    },
    {
      name: 'Real Madrid',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/9/98/Real_Madrid.png',
    },
    {
      name: 'Juventus',
      logo: 'https://image-service.onefootball.com/transform?w=256&dpr=2&image=https://images.onefootball.com/icons/teams/164/17.png',
    },
    {
      name: 'Bayern Munich',
      logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/132.png',
    },
  ];

  rankings = [
    {
      label: 'Artilheiros',
      values: [
        {
          position: 1,
          name: 'Pedro',
          value: '15',
          image: this.teams[1].logo,
        },
        {
          position: 2,
          name: 'Endrick',
          value: '12',
          image: this.teams[0].logo,
        },
        {
          position: 3,
          name: 'Halland',
          value: '10',
          image: this.teams[3].logo,
        },
        {
          position: 4,
          name: 'Martinelli',
          value: '8',
          image: this.teams[2].logo,
        },
      ],
    },
    {
      label: 'Assitências',
      values: [
        {
          position: 1,
          name: 'Alex',
          value: '18',
          image: this.teams[0].logo,
        },
        {
          position: 2,
          name: 'Petkovic',
          value: '12',
          image: this.teams[1].logo,
        },
        {
          position: 3,
          name: 'De Bruyne',
          value: '10',
          image: this.teams[3].logo,
        },
        {
          position: 4,
          name: 'Martinelli',
          value: '8',
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
          value: '45',
          image: this.teams[0].logo,
        },
        {
          position: 2,
          name: 'Flamengo',
          value: '42',
          image: this.teams[1].logo,
        },
        {
          position: 3,
          name: 'Arsenal',
          value: '35',
          image: this.teams[2].logo,
        },
        {
          position: 4,
          name: 'Manchester City',
          value: '22',
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
          value: '8',
          image: this.teams[1].logo,
        },
        {
          position: 2,
          name: 'Palmeiras',
          value: '12',
          image: this.teams[0].logo,
        },
        {
          position: 3,
          name: 'Arsenal',
          value: '15',
          image: this.teams[2].logo,
        },
        {
          position: 4,
          name: 'Manchester City',
          value: '22',
          image: this.teams[3].logo,
        },
      ],
    },
  ];
}
