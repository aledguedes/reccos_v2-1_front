import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [ButtonModule, NgClass],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
})
export class SidebarMenuComponent {
  items = [
    {
      name: 'Cadastro Atletas',
      link: 'page2.html',
      icon: 'pi-folder',
      children: [{ name: 'CHATGPT', link: 'page2.html', icon: '🖹' }],
      isOpen: false,
    },
    {
      name: 'Ficha Técnica',
      link: 'page5.html',
      icon: 'pi-file',
      children: [{ name: 'ZZZ Code AI', link: 'page5.html', icon: '🗅' }],
      isOpen: false,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleMenu(item: any) {
    item.isOpen = !item.isOpen;
  }
}
