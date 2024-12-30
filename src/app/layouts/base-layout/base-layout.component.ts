import { Component } from '@angular/core';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from '../../pages/components/header/header.component';
import { RouterOutlet } from '@angular/router';

const components = [SidebarMenuComponent, HeaderComponent];
const modules = [RouterOutlet];

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [...components, ...modules],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
