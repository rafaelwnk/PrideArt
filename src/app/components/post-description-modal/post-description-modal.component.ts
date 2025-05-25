import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-description-modal',
  imports: [],
  templateUrl: './post-description-modal.component.html'
})
export class PostDescriptionModalComponent {
  @Input() post!: Post | null;
}
