import { Component, OnInit } from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [InputFormsComponent],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.scss',
})
export class PlayerEditComponent implements OnInit {
  titlePage = '';
  constructor(private actvRouter: ActivatedRoute) {}
  ngOnInit(): void {
    this.actvRouter.queryParams.subscribe((data) => {
      this.titlePage =
        data['action'] === 'create' ? 'Novo atleta' : 'Editar Atleta';
    });
  }
}
