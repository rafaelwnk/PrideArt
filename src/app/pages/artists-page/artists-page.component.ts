import { Component } from '@angular/core';
import { ArtistsCardComponent } from "../../components/artists/artists-card/artists-card.component";
import { User } from '../../models/user.model';
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { forkJoin } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-artists-page',
  imports: [ArtistsCardComponent, LoadingComponent, CommonModule],
  templateUrl: './artists-page.component.html'
})
export class ArtistsPageComponent {
  public users!: User[];
  public followingUsers!: User[];
  public busy = false;

  constructor(
    private service: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.busy = true;

    forkJoin([
      this.service.getUsers(),
      this.service.getFollowingUsers()
    ]).subscribe({
      next: (responses: ApiResponse<User[]>[]) => {
        this.users = responses[0].data;
        this.followingUsers = responses[1].data,
          this.busy = false;
      },
      error: (error: any) => {
        console.log(error.error.errors);
        this.toastr.error(error.error.errors);
        this.busy = false;
      }
    })
  }
}
