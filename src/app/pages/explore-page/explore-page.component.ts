import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { map, Observable, tap } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { PostDescriptionModalComponent } from "../../components/post-description-modal/post-description-modal.component";
import { LoadingComponent } from "../../components/shared/loading/loading.component";

@Component({
  selector: 'app-explore-page',
  imports: [PostCardComponent, CommonModule, PostDescriptionModalComponent, LoadingComponent],
  templateUrl: './explore-page.component.html'
})
export class ExplorePageComponent {
  public posts$!: Observable<Post[]>;
  public followedPosts$!: Observable<Post[]>;
  public selectedPost!: Post;
  public busy = false;

  constructor(private service: PostService) { }

  ngOnInit() {
    this.busy = true;
    this.posts$ = this.service.getPosts().pipe(
      map(data => data.data)
    );
    this.followedPosts$ = this.service.getFollowedPosts().pipe(
      map(data => data.data),
      tap(() => this.busy = false)
    );
  }

  onSelectedPost(post: Post) {
    this.selectedPost = post;
  }
}
