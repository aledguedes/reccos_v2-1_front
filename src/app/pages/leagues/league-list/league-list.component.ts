import { Component, OnInit } from '@angular/core';
import { ILeagueResponse } from '../../../models/entities/LeagueModel';
import { IListCads } from '../../../models/generals/ListCardModel';
import { LeagueService } from '../../../services/leagues/league.service';
import { IBreadcrumb } from '../../../models/generals/BreadcrumbModels';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DashStatisticsComponent } from '../../../layouts/dash-statistics/dash-statistics.component';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

const components = [
  DashStatisticsComponent,
  TableModule,
  ButtonModule,
  CardModule,
  TagModule,
];
const modules = [RouterLink];

interface IStatisticsCards {
  label: string;
  value: string;
  icon: string;
  redux: boolean;
  isImage: boolean;
}

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-league-list',
  standalone: true,
  imports: [...components, ...modules],
  templateUrl: './league-list.component.html',
  styleUrl: './league-list.component.scss',
})
export class LeagueListComponent implements OnInit {
  page = 1;
  perPage = 12;
  cardFlags: IListCads = {
    flag: 'leagues',
    router: 'league-edit',
  };
  leagues: ILeagueResponse[] = [];

  breadcrumb: Partial<IBreadcrumb>[] = [
    { icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Ligas' },
  ];

  statsCards: IStatisticsCards[] = [
    {
      label: 'Total Leagues',
      icon: 'ri-trophy-line',
      redux: false,
      value: '12',
      isImage: false,
    },
    {
      label: 'Active Teams',
      icon: 'ri-user-line',
      redux: false,
      value: '286',
      isImage: false,
    },
    {
      label: 'Upcoming Matches',
      icon: 'ri-calendar-line',
      redux: false,
      value: '24',
      isImage: false,
    },
  ];

  cols: Column[] = [
    { field: 'id', header: 'Code' },
    { field: 'name', header: 'Nome Liga' },
    { field: 'format', header: 'Formato' },
    { field: 'status', header: 'Status' },
    { field: 'action', header: 'Ação' },
  ];

  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.getAllLeagues();
  }

  getAllLeagues() {
    this.leagueService.getAllLeagues(this.page, this.perPage).subscribe({
      next: (data) => {
        this.leagues = data;
        // console.log('LEAGUES ALL', this.leagues);
      },
      error: (err) => {
        console.log('LEAGUES ALL ERR', err);
      },
    });
  }

  removeLeague(league_id: number) {
    console.log('league remove', league_id);
  }
}
