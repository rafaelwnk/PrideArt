import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { PostModalComponent } from "./components/post-modal/post-modal.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

}
