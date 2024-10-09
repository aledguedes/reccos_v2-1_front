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
    path: 'players',
    loadChildren: () =>
      import('./pages/players/player.routes').then((r) => r.PLAYER_ROUTES),
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./pages/teams/team.routes').then((r) => r.TEAM_ROUTES),
  },
  {
    path: 'federations',
    loadChildren: () =>
      import('./pages/federations/federation.routes').then(
        (r) => r.FEDERATION_ROUTES,
      ),
  },
  {
    path: 'leagues',
    loadChildren: () =>
      import('./pages/leagues/league.routes').then((r) => r.LEAGUE_ROUTES),
  },
  {
    path: 'refrees',
    loadChildren: () =>
      import('./pages/refree/refree.routes').then((r) => r.REFREE_ROUTES),
  },
];
