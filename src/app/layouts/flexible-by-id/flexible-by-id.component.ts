import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DashStatisticsComponent } from '../dash-statistics/dash-statistics.component';

import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from '../../pages/components/header/header.component';

const modules = [CardModule, ButtonModule, MessageModule, DividerModule];

const components = [
  HeaderComponent,
  SidebarMenuComponent,
  DashStatisticsComponent,
];

interface IStatisticsCards {
  label: string;
  value: string;
  icon: string;
  redux: boolean;
}

@Component({
  selector: 'app-flexible-by-id',
  standalone: true,
  imports: [...modules, ...components],
  templateUrl: './flexible-by-id.component.html',
  styleUrl: './flexible-by-id.component.scss',
})
export class FlexibleByIdComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  teamsSelectedsLeague: any[] = [
    {
      picture_profile:
        'https://upload.wikimedia.org/wikipedia/pt/c/c5/F.C._Porto_logo.png',
      label: 'Porto FC',
    },
    {
      picture_profile:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png',
      label: 'Benfica FC',
    },
    {
      picture_profile:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Sporting_Clube_de_Portugal_%28Logo%29.svg/1200px-Sporting_Clube_de_Portugal_%28Logo%29.svg.png',
      label: 'Sporting FC',
    },
  ];

  league: {
    name: string;
    groups: {
      picture_profile: string;
      label: string;
    }[];
  }[] = [
    {
      name: 'Grupo 1',
      groups: [
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/pt/c/c5/F.C._Porto_logo.png',
          label: 'Porto FC',
        },
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png',
          label: 'Benfica FC',
        },
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Sporting_Clube_de_Portugal_%28Logo%29.svg/1200px-Sporting_Clube_de_Portugal_%28Logo%29.svg.png',
          label: 'Sporting FC',
        },
      ],
    },
    {
      name: 'Grupo 2',
      groups: [
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/pt/c/c5/F.C._Porto_logo.png',
          label: 'Porto FC',
        },
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png',
          label: 'Benfica FC',
        },
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Sporting_Clube_de_Portugal_%28Logo%29.svg/1200px-Sporting_Clube_de_Portugal_%28Logo%29.svg.png',
          label: 'Sporting FC',
        },
      ],
    },
    {
      name: 'Grupo 3',
      groups: [
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/pt/c/c5/F.C._Porto_logo.png',
          label: 'Porto FC',
        },
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png',
          label: 'Benfica FC',
        },
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Sporting_Clube_de_Portugal_%28Logo%29.svg/1200px-Sporting_Clube_de_Portugal_%28Logo%29.svg.png',
          label: 'Sporting FC',
        },
      ],
    },
    {
      name: 'Grupo 4',
      groups: [
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/pt/c/c5/F.C._Porto_logo.png',
          label: 'Porto FC',
        },
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png',
          label: 'Benfica FC',
        },
        {
          picture_profile:
            'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Sporting_Clube_de_Portugal_%28Logo%29.svg/1200px-Sporting_Clube_de_Portugal_%28Logo%29.svg.png',
          label: 'Sporting FC',
        },
      ],
    },
  ];

  statistics: IStatisticsCards[] = [
    {
      label: 'Number of teams',
      value: '20',
      icon: './images/chart/bar_chart.png',
      redux: false,
    },
    {
      label: 'Number of goals',
      value: '175',
      icon: './images/chart/pie_chart.png',
      redux: false,
    },
    {
      label: 'Total matches',
      value: '45',
      icon: './images/chart/pie_chart.png',
      redux: false,
    },
    {
      label: 'Leader',
      value: 'Queens',
      icon: './images/chart/bar_chart.png',
      redux: true,
    },
  ];

  addTeamsLeague() {
    console.log('TEAMS');
  }
}
