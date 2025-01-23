import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';
import { IListCads } from '../../models/generals/ListCardModel';

const components = [TableModule, ButtonModule, CardModule, TagModule];

const modules = [RouterLink];

@Component({
  selector: 'app-list-cards-landscape',
  standalone: true,
  imports: [...components, ...modules],
  templateUrl: './list-cards-landscape.component.html',
  styleUrl: './list-cards-landscape.component.scss',
})
export class ListCardsLandscapeComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any;
  @Input() toQueries: IListCads = {
    flag: '',
    router: '',
  };
}
