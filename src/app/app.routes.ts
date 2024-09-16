import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './pages/dashborad/components/dash-admin/dash-admin.component'
      ).then((c) => c.DashAdminComponent),
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./pages/players/player.routes').then((r) => r.PLAYER_ROUTES),
  },
];
