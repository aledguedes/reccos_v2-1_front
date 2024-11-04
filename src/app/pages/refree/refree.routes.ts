import { Routes } from '@angular/router';
import { FormEditComponent } from '../components/form-edit/form-edit.component';
import { RefreeRouterComponent } from './refree-router.components';
import { RefreeListComponent } from './refree-list/refree-list.component';

export const REFREE_ROUTES: Routes = [
  {
    path: '',
    component: RefreeRouterComponent,
    children: [
      {
        path: '',
        component: RefreeListComponent,
      },
      {
        path: 'refree-edit',
        component: FormEditComponent,
      },
    ],
  },
];
