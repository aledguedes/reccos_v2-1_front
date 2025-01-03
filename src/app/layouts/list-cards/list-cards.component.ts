import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IListCads } from '../../models/generals/ListCardModel';

@Component({
  selector: 'app-list-cards',
  standalone: true,
  imports: [RouterLink, ButtonModule, CardModule],
  templateUrl: './list-cards.component.html',
  styleUrl: './list-cards.component.scss',
})
export class ListCardsComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any;
  @Input() toQueries: IListCads = {
    flag: '',
    router: '',
  };

  img01 = 'https://primefaces.org/cdn/primeng/images/card-ng.jpg';
  img02 = 'https://bulma.io/assets/images/placeholders/96x96.png';
}
