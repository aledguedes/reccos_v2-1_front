import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeamService } from '../../../services/teams/team.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IListCads } from '../../../models/generals/ListCardModel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IBreadcrumb } from '../../../models/generals/BreadcrumbModels';
import { ListCardsComponent } from '../../../layouts/list-cards/list-cards.component';

interface ITeam {
  id?: number;
  surname: string;
}

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    RouterLink,
    BreadcrumbComponent,
    ListCardsComponent,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss',
})
export class TeamListComponent implements OnInit {
  page = 1;
  perPage = 12;

  teams: ITeam[] = [];
  baseUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWhr7q7fMAKPUNqQc7kJQRbI7-VQOizKFTUA&s';

  cardFlags: IListCads = {
    flag: 'teams',
    router: 'team-edit',
  };

  breadcrumb: Partial<IBreadcrumb>[] = [
    { icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Times' },
  ];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.getAllTeams();
  }

  getAllTeams() {
    this.teamService.getAllTeams(this.page, this.perPage).subscribe({
      next: (data) => {
        this.teams = data;
        // console.log('TEAMS ALL', this.teams);
      },
      error: (err) => {
        console.log('PLAYERS ALL ERR', err);
      },
    });
  }
}
