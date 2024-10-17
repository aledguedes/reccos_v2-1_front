import { Component, Output, EventEmitter } from '@angular/core';
import { IStatusForm } from '../../../models/generals/Outputs';

@Component({
  selector: 'app-form-upload',
  standalone: true,
  imports: [],
  templateUrl: './form-upload.component.html',
  styleUrl: './form-upload.component.scss',
})
export class FormUploadComponent {
  @Output() statusFormUpload = new EventEmitter<IStatusForm>();
  uploadFiles(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Arquivo selecionado:', file);
    }

    this.statusFormUpload.emit({
      form: 'upload',
      status: true,
    });
  }
}
