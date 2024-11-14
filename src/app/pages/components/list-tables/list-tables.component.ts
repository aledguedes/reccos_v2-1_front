import { Component, Input } from '@angular/core';
import { IListCads } from '../../../models/generals/ListCardModel';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list-tables',
  standalone: true,
  imports: [TableModule],
  templateUrl: './list-tables.component.html',
  styleUrl: './list-tables.component.scss',
})
export class ListTablesComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any;
  @Input() toQueries: IListCads = {
    flag: '',
    router: '',
  };

  cols: Column[] = [
    { field: 'id', header: '#ID' },
    { field: 'name', header: 'Nome' },
    { field: 'surname', header: 'Apelido' },
    { field: 'status', header: 'Status' },
  ];
}

interface Column {
  field: string;
  header: string;
}
