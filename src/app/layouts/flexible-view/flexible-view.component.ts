import { Component, Input } from '@angular/core';
import { IListCads } from '../../models/generals/ListCardModel';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

const modules = [RouterLink];
const components = [ButtonModule];
@Component({
  selector: 'app-flexible-view',
  standalone: true,
  imports: [...modules, ...components],
  templateUrl: './flexible-view.component.html',
  styleUrl: './flexible-view.component.scss',
})
export class FlexibleViewComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any;
  @Input() toQueries: IListCads = {
    flag: '',
    router: '',
  };
}
