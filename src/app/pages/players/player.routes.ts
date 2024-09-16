import { Routes } from '@angular/router';
import { PlayerRouterComponent } from './player-router.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerListComponent } from './player-list/player-list.component';

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
        component: PlayerEditComponent,
      },
    ],
  },
];
