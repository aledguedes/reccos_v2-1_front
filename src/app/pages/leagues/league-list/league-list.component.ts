import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { RouterLink } from '@angular/router';
import { ILeagueResponse } from '../../../models/entities/LeagueModel';
import { IListCads } from '../../../models/generals/ListCardModel';
import { LeagueService } from '../../../services/leagues/league.service';
// import { ListCardsComponent } from '../../components/list-cards/list-cards.component';
import { IBreadcrumb } from '../../../models/generals/BreadcrumbModels';
import { ButtonModule } from 'primeng/button';
import { FlexibleViewComponent } from '../../../layouts/flexible-view/flexible-view.component';

@Component({
  selector: 'app-league-list',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    RouterLink,
    FlexibleViewComponent,
    ButtonModule,
  ],
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

  constructor(private leagueService: LeagueService) {}

  ngOnInit(): void {
    this.getAllLeagues();
  }

  getAllLeagues() {
    this.leagueService.getAllLeagues(this.page, this.perPage).subscribe({
      next: (data) => {
        this.leagues = data;
        console.log('LEAGUES ALL', this.leagues);
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
