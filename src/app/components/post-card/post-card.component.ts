  import { Component, EventEmitter, Input, Output} from '@angular/core';
  import { Post } from '../../models/post.model';
import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-post-card',
    imports: [RouterModule],
    templateUrl: './post-card.component.html',
    styleUrl: './post-card.component.css'
  })
  export class PostCardComponent {
    @Input() post!: Post ;
    @Input() isLoggedInUser: boolean = false;
    @Input() isLiked: boolean = false;
    @Output() selectedPost = new EventEmitter<Post>();
    
    selectPost(post: Post) {
      this.selectedPost.emit(post);
    }

    toggleLike() {
    this.isLiked = !this.isLiked;
  }
  }
