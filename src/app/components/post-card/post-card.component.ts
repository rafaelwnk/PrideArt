  import { Component, EventEmitter, Input, Output} from '@angular/core';
  import { Post } from '../../models/post.model';

  @Component({
    selector: 'app-post-card',
    imports: [],
    templateUrl: './post-card.component.html',
    styleUrl: './post-card.component.css'
  })
  export class PostCardComponent {
    @Input() post!: Post ;
    @Input() isFollowing: boolean = false;
    @Output() selectedPost = new EventEmitter<Post>();
    
    selectPost(post: Post) {
      this.selectedPost.emit(post);
    }
  }
