import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IFederationResponse } from '../../../models/IFederationModel';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ListCardsComponent } from '../../components/list-cards/list-cards.component';
import { IListCads } from '../../../models/ILIstCardModel';

@Component({
  selector: 'app-federation-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, ListCardsComponent],
  templateUrl: './federation-list.component.html',
  styleUrl: './federation-list.component.scss',
})
export class FederationListComponent {
  federations: IFederationResponse[] = [
    {
      id: 1,
      name: 'Federação 01',
      surname: 'FEDE_1',
      status: 'Ativo',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      name: 'Federação 02',
      surname: 'FEDE_2',
      status: 'Ativo',
      created_at: '',
      updated_at: '',
    },
    {
      id: 3,
      name: 'Federação 03',
      surname: 'FEDE_3',
      status: 'Ativo',
      created_at: '',
      updated_at: '',
    },
    {
      id: 4,
      name: 'Federação 04',
      surname: 'FEDE_4',
      status: 'Ativo',
      created_at: '',
      updated_at: '',
    },
    {
      id: 5,
      name: 'Federação 05',
      surname: 'FEDE_5',
      status: 'Ativo',
      created_at: '',
      updated_at: '',
    },
    {
      id: 6,
      name: 'Federação 06',
      surname: 'FEDE_6',
      status: 'Ativo',
      created_at: '',
      updated_at: '',
    },
  ];

  cardFlags: IListCads = {
    flag: 'federations',
    router: 'federation-edit',
  };

  removeFederation(federation_id: number) {
    console.log('federation remove', federation_id);
  }
}
