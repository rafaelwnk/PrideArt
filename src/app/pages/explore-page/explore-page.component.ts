import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from "../../components/post/post-card/post-card.component";
import { firstValueFrom, forkJoin, map, Observable, tap } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { PostDescriptionModalComponent } from "../../components/post/post-description-modal/post-description-modal.component";
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { ApiResponse } from '../../models/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-explore-page',
  imports: [PostCardComponent, CommonModule, PostDescriptionModalComponent, LoadingComponent],
  templateUrl: './explore-page.component.html'
})
export class ExplorePageComponent {
  public posts!: Post[];
  public loggedInUser!: User;
  public followingPosts!: Post[];
  public selectedPost!: Post;
  public busy = false;

  constructor(
    private postService: PostService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {  
    this.busy = true;

    forkJoin([
      this.postService.getPosts(),
      this.postService.getFollowingPosts(),
      this.accountService.getLoggedInUser()
    ]).subscribe({
      next: (responses: ApiResponse<any>[]) =>
      {
        this.posts = responses[0].data;
        this.followingPosts = responses[1].data;
        this.loggedInUser = responses[2].data;
        this.busy = false;
      },
      error: (error: any) => 
      {
        console.log(error.error.errors);
        this.toastr.error(error.error.errors);
        this.busy = false;
      }
    })
  }

  onSelectedPost(post: Post) {
    this.selectedPost = post;
  }
}
