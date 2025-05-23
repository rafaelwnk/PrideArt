import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';

@Component({
  selector: 'app-frame-page',
  imports: [RouterOutlet, NavbarComponent],
  template: '<app-navbar></app-navbar><router-outlet></router-outlet>'
})
export class FramePageComponent {

}