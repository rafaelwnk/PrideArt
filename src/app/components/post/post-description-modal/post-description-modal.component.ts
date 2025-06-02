import { Component, Input, SimpleChanges } from '@angular/core';
import { Post } from '../../../models/post.model';
import { RouterModule } from '@angular/router';
import { EditPostModalComponent } from "../edit-post-modal/edit-post-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-description-modal',
  imports: [RouterModule, EditPostModalComponent, CommonModule],
  templateUrl: './post-description-modal.component.html'
})

export class PostDescriptionModalComponent {
  @Input() post?: Post;
  @Input() isLoggedInUser!: boolean;
}

