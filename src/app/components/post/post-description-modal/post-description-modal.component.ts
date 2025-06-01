import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { RouterModule } from '@angular/router';

declare const UIkit: any;

@Component({
  selector: 'app-post-description-modal',
  imports: [RouterModule],
  templateUrl: './post-description-modal.component.html'
})

export class PostDescriptionModalComponent {
  @Input() post?: Post;

}

