import { Component } from '@angular/core';
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { EditProfileModalComponent } from "../../components/edit-profile-modal/edit-profile-modal.component";
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { CommonModule } from '@angular/common';
import { PostDescriptionModalComponent } from "../../components/post-description-modal/post-description-modal.component";
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  imports: [PostCardComponent, EditProfileModalComponent, LoadingComponent, CommonModule, PostDescriptionModalComponent, RouterModule],
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent {
  public isLoggedInUser = false;
  public isFollowing = false;
  public paramsUsername!: string;
  public user$!: Observable<User>;
  public posts$!: Observable<Post[]>;
  public likedPosts$!: Observable<Post[]>;
  public selectedPost!: Post;
  public busy = false;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.busy = true;

      this.posts$ = new Observable<Post[]>();
      this.likedPosts$ = new Observable<Post[]>();

      this.paramsUsername = params.get('username')!;
      const data = await firstValueFrom(this.accountService.getLoggedInUser());
      this.isLoggedInUser = (data.data.username === this.paramsUsername);
      

      if(this.isLoggedInUser) {
        this.likedPosts$ = this.postService.getLikedPosts().pipe(
        map(data => data.data)
      );
      } else {
        const data = await firstValueFrom(this.userService.getFollowedUsers());
        const users = data.data;
        this.isFollowing = users.some(user => user.username === this.paramsUsername);
      }


      this.posts$ = this.postService.getPostsByUsername(this.paramsUsername).pipe(
        map(data => data.data),
        tap(() => this.busy = false)
      );
    });
  }

  onSelectedPost(post: Post) {
    this.selectedPost = post;
  }
}
