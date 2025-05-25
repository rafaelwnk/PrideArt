import { Component } from '@angular/core';
import { PostModalComponent } from "../../post-modal/post-modal.component";
import { Router, RouterModule } from '@angular/router';
import { Security } from '../../../utils/security.utils';

@Component({
  selector: 'app-navbar',
  imports: [PostModalComponent, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    Security.clear();
    this.router.navigate(['/login']);
  }
}
