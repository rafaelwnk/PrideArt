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
  public user: User | null = null;
  public busy = false;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}


  ngOnInit() {
    this.busy = true;
    this.accountService.getLoggedInUser().subscribe({
      next: (data: ApiResponse<User>) => {
        this.user = data.data; 
        this.busy = false;
      },
      error: (error: any) => {
        console.log(error);
        this.busy = false;
      }
    })
  }

  logout() {
    Security.clear();
    this.router.navigate(['/login']);
  }
}
