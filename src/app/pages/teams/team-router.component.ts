import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class TeamRouterComponent {}
