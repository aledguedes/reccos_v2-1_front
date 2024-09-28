import { Routes } from '@angular/router';
import { TeamRouterComponent } from './team-router.component';
import { TeamListComponent } from './team-list/team-list.component';
import { FormEditComponent } from '../components/form-edit/form-edit.component';

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
        component: FormEditComponent,
      },
    ],
  },
];
