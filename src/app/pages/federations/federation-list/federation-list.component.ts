import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IFederationResponse } from '../../../models/entities/FederationModel';
import { IListCads } from '../../../models/generals/ListCardModel';
import { FederationService } from '../../../services/federations/federation.service';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IBreadcrumb } from '../../../models/generals/BreadcrumbModels';
import { ListCardsPortraitComponent } from '../../../layouts/list-cards-portrait/list-cards-portrait.component';
// import { ListCardsComponent } from '../../components/list-cards/list-cards.component';

@Component({
  selector: 'app-federation-list',
  standalone: true,
  imports: [
    RouterLink,
    ListCardsPortraitComponent,
    ButtonModule,
    BreadcrumbComponent,
  ],
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

  breadcrumb: Partial<IBreadcrumb>[] = [
    { icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Federação' },
  ];

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
          // console.log('FEDERATIONS ALL', this.federations);
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
