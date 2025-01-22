import { Component, Input } from '@angular/core';
import { IListCads } from '../../models/generals/ListCardModel';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

const modules = [RouterLink, ButtonModule];
const prime = [CardModule];

@Component({
  selector: 'app-list-cards-portrait',
  standalone: true,
  imports: [...modules, ...prime],
  templateUrl: './list-cards-portrait.component.html',
  styleUrl: './list-cards-portrait.component.scss',
})
export class ListCardsPortraitComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any;
  @Input() toQueries: IListCads = {
    flag: '',
    router: '',
  };

  img01 = 'https://primefaces.org/cdn/primeng/images/card-ng.jpg';
  img02 = 'https://bulma.io/assets/images/placeholders/96x96.png';
}
