import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderComponent, ToolbarModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
