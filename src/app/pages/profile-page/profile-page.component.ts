import { Component } from '@angular/core';
import { PostCardComponent } from "../../components/post/post-card/post-card.component";
import { EditProfileModalComponent } from "../../components/profile/edit-profile-modal/edit-profile-modal.component";
import { firstValueFrom, forkJoin, map, Observable, tap } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { CommonModule } from '@angular/common';
import { PostDescriptionModalComponent } from "../../components/post/post-description-modal/post-description-modal.component";
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { ApiResponse } from '../../models/api-response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  imports: [PostCardComponent, EditProfileModalComponent, LoadingComponent, CommonModule, PostDescriptionModalComponent, RouterModule],
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent {
  public isLoggedInUser = false;
  public isFollowing = false;
  public paramsUsername!: string;
  public profileUser!: User;
  public editProfileUser!: User;
  public posts!: Post[];
  public likedPosts!: Post[];
  public selectedPost!: Post;
  public busy = false;

  constructor(
    private accountService: AccountService,
    private postService: PostService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.busy = true;

      this.posts = [] as Post[];
      this.likedPosts = [] as Post[];

      this.paramsUsername = params.get('username')!;

      this.accountService.getLoggedInUser().subscribe({
        next: (data: ApiResponse<User>) => {
          this.isLoggedInUser = (data.data.username === this.paramsUsername);

          if (this.isLoggedInUser) {
            this.profileUser = data.data;
            this.editProfileUser = data.data;
            this.loadLoggedInUserData();
          } else {
            this.loadUserData();
          }
        },
        error: (error: any) => {
          console.log(error.error.errors);
          this.toastr.error(error.error.errors);
          this.busy = false;
        }
      });
    });
  }

  private loadLoggedInUserData() {
    forkJoin([
      this.postService.getAllPostsByUsername(this.paramsUsername),
      this.postService.getLikedPosts()
    ]).subscribe({
      next: (responses: ApiResponse<Post[]>[]) => {
        this.posts = responses[0].data;
        this.likedPosts = responses[1].data;
        this.busy = false;
      },
      error: (error: any) => {
        console.log(error.error.errors);
        this.toastr.error(error.error.errors);
        this.busy = false;
      }
    })
  }

  private loadUserData() {
    forkJoin([
      this.accountService.getUserByUsername(this.paramsUsername),
      this.postService.getAllPostsByUsername(this.paramsUsername),
      this.accountService.getFollowingUsers()
    ]).subscribe({
      next: ([userResponse ,postResponse, followingUsersResponse]: [ApiResponse<User> ,ApiResponse<Post[]>, ApiResponse<User[]>]) => {
        this.profileUser = userResponse.data;
        this.posts = postResponse.data;
        const users = followingUsersResponse.data;
        this.isFollowing = users.some(user => user.username === this.paramsUsername);
        this.busy = false;
      },
      error: (error: any) => {
        console.log(error.error.errors);
        this.toastr.error(error.error.errors);
        this.busy = false;
      }
    })
  }

  onSelectedPost(post: Post) {
    this.selectedPost = post;
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }
}
