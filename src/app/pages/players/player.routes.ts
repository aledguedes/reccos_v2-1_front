import { Routes } from '@angular/router';
import { PlayerRouterComponent } from './player-router.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { FormEditComponent } from '../components/form-edit/form-edit.component';

export const PLAYER_ROUTES: Routes = [
  {
    path: '',
    component: PlayerRouterComponent,
    children: [
      {
        path: '',
        component: PlayerListComponent,
      },
      {
        path: 'player-edit',
        component: FormEditComponent,
      },
    ],
  },
];
