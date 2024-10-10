import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IFederationResponse } from '../../../models/entities/FederationModel';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ListCardsComponent } from '../../components/list-cards/list-cards.component';
import { IListCads } from '../../../models/generals/ListCardModel';
import { FederationService } from '../../../services/federations/federation.service';

@Component({
  selector: 'app-federation-list',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, ListCardsComponent],
  templateUrl: './federation-list.component.html',
  styleUrl: './federation-list.component.scss',
})
export class FederationListComponent implements OnInit {
  page = 1;
  perPage = 12;
  cardFlags: IListCads = {
    flag: 'federations',
    router: 'federation-edit',
  };
  federations: IFederationResponse[] = [];

  constructor(private federationService: FederationService) {}

  ngOnInit(): void {
    this.getAllFederations();
  }

  getAllFederations() {
    this.federationService
      .getAllFederations(this.page, this.perPage)
      .subscribe({
        next: (data) => {
          this.federations = data;
          console.log('FEDERATIONS ALL', this.federations);
        },
        error: (err) => {
          console.log('PLAYERS ALL ERR', err);
        },
      });
  }

  removeFederation(federation_id: number) {
    console.log('federation remove', federation_id);
  }
}
