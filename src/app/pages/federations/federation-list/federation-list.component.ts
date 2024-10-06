import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IFederationResponse } from '../../../models/IFederationModel';

@Component({
  selector: 'app-federation-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './federation-list.component.html',
  styleUrl: './federation-list.component.scss'
})
export class FederationListComponent {

  federations: IFederationResponse[] = [
    {
      id: 1,
      name: 'Federação 01',
      surname: 'FEDE_1',
      status: 'Ativo',
      created_at: '',
      updated_at: ''
    },
    {
      id: 2,
      name: 'Federação 02',
      surname: 'FEDE_2',
      status: 'Ativo',
      created_at: '',
      updated_at: ''
    }
  ];

  removeFederation(federation_id: number) {
    console.log("federation remove", federation_id);
  }
}
