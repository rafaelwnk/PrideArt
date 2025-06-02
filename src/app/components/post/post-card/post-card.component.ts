import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Post } from '../../../models/post.model';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { PostService } from '../../../services/post.service';
import { AccountService } from '../../../services/account.service';
import { ApiResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() user!: User;
  @Input() isLiked: boolean = false;
  @Output() selectedPost = new EventEmitter<Post>();
  @Output() isEditing = new EventEmitter<boolean>();

  constructor(private postService: PostService) { }

  ngOnInit() {
      this.isLiked = this.post.usersLiked.some(x => x.username === this.user.username);
  }

  selectPost(post: Post) {
    this.selectedPost.emit(post);
  }

  toggleLike() {
    if (!this.isLiked) {
      this.postService.likePost(this.post.id).subscribe({
        next: (data: ApiResponse<Post>) => {
          this.isLiked = !this.isLiked;
        },
        error: (error: any) => {
          console.log(error.error.errors);
        }
      })
    } else {
      this.postService.unlikePost(this.post.id).subscribe({
        next: (data: ApiResponse<Post>) => {
          this.isLiked = !this.isLiked;
        },
        error: (error: any) => {
          console.log(error.error.errors);
        }
      })
    }

  }
}
