import { Routes } from '@angular/router';
import { FormEditComponent } from '../components/form-edit/form-edit.component';
import { LeagueRouterComponent } from './league-router.components';
import { LeagueListComponent } from './league-list/league-list.component';

export const LEAGUE_ROUTES: Routes = [
  {
    path: '',
    component: LeagueRouterComponent,
    children: [
      {
        path: '',
        component: LeagueListComponent,
      },
      {
        path: 'league-edit',
        component: FormEditComponent,
      },
    ],
  },
];
