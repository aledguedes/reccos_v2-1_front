import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { RouterLink } from '@angular/router';
import { ILeagueResponse } from '../../../models/LeagueModel';
import { IListCads } from '../../../models/ListCardModel';
import { LeagueService } from '../../../services/leagues/league.service';
import { ListCardsComponent } from '../../components/list-cards/list-cards.component';

@Component({
  selector: 'app-league-list',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink, ListCardsComponent],
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
