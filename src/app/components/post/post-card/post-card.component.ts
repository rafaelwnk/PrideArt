import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models/post.model';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { PostService } from '../../../services/post.service';
import { ApiResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() loggedInUser!: User;
  @Input() isLiked: boolean = false;
  @Output() selectedPost = new EventEmitter<Post>();
  @Output() isEditing = new EventEmitter<boolean>();

  public countLike = 0;

  constructor(
    private service: PostService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isLiked = this.post.usersLiked.some(x => x.username === this.loggedInUser.username);
    this.countLike = this.post.usersLiked.length;
  }

  selectPost(post: Post) {
    this.selectedPost.emit(post);
  }

  toggleLike() {
    if (!this.isLiked) {
      this.service.likePost(this.post.id).subscribe({
        next: (data: ApiResponse<Post>) => {
          this.isLiked = !this.isLiked;
          this.countLike = data.data.usersLiked.length;
          this.ref.markForCheck();
        },
        error: (error: any) => {
          console.log(error.error.errors);
        }
      })
    } else {
      this.service.unlikePost(this.post.id).subscribe({
        next: (data: ApiResponse<Post>) => {
          this.isLiked = !this.isLiked;
          this.countLike = data.data.usersLiked.length;
          this.ref.markForCheck();
        },
        error: (error: any) => {
          console.log(error.error.errors);
        }
      })
    }

  }
}
