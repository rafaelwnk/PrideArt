import { Component } from '@angular/core';
import { ArtistsCardComponent } from "../../components/artists-card/artists-card.component";
import { map, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artists-page',
  imports: [ArtistsCardComponent, LoadingComponent, CommonModule],
  templateUrl: './artists-page.component.html'
})
export class ArtistsPageComponent {
    public users$!: Observable<User[]>;
    public followedUsers$!: Observable<User[]>;
    public busy = false;

    constructor(private service: UserService) {}

    ngOnInit() {
      this.busy = true;
      this.users$ = this.service.getUsers().pipe(
        map(data => data.data)
      );
      this.followedUsers$ = this.service.getFollowedUsers().pipe(
        map(data => data.data),
        tap(() => this.busy = false)
      )
    }
}
