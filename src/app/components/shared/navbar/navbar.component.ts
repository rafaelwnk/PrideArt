import { Component } from '@angular/core';
import { PostModalComponent } from "../../post-modal/post-modal.component";
import { Router, RouterModule } from '@angular/router';
import { Security } from '../../../utils/security.utils';
import { AccountService } from '../../../services/account.service';
import { User } from '../../../models/user.model';
import { ApiResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-navbar',
  imports: [PostModalComponent, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  public user!: User;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}


  ngOnInit() {
    this.accountService.getLoggedInUser().subscribe({
      next: (data: ApiResponse<User>) => {
        this.user = data.data; 
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  logout() {
    Security.clear();
    this.router.navigate(['/login']);
  }
}
