import { Routes } from '@angular/router';
import { TeamRouterComponent } from './team-router.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamEditComponent } from './team-edit/team-edit.component';

export const TEAM_ROUTES: Routes = [
  {
    path: '',
    component: TeamRouterComponent,
    children: [
      {
        path: '',
        component: TeamListComponent,
      },
      {
        path: 'team-edit',
        component: TeamEditComponent,
      },
    ],
  },
];
