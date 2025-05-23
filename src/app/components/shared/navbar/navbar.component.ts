import { Component } from '@angular/core';
import { PostModalComponent } from "../../post-modal/post-modal.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [PostModalComponent, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

}
