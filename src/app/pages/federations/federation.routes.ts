import { Routes } from '@angular/router';
import { FormEditComponent } from '../components/form-edit/form-edit.component';
import { FederationRouterComponent } from './federation-router.components';
import { FederationListComponent } from './federation-list/federation-list.component';

export const FEDERATION_ROUTES: Routes = [
  {
    path: '',
    component: FederationRouterComponent,
    children: [
      {
        path: '',
        component: FederationListComponent,
      },
      {
        path: 'federation-edit',
        component: FormEditComponent,
      },
    ],
  },
];
