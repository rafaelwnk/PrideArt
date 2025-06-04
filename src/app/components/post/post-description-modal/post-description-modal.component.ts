import { Component, DestroyRef, inject, Input, SimpleChanges } from '@angular/core';
import { Post } from '../../../models/post.model';
import { RouterModule } from '@angular/router';
import { EditPostModalComponent } from "../edit-post-modal/edit-post-modal.component";
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';

declare var UIkit: any;

@Component({
  selector: 'app-post-description-modal',
  imports: [RouterModule, EditPostModalComponent, CommonModule],
  templateUrl: './post-description-modal.component.html'
})

export class PostDescriptionModalComponent {
  @Input() post?: Post;
  @Input() isLoggedInUser!: boolean;
  @Input() loggedInUser!: User;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyModal();
    });
  }


  destroyModal() {
    const modal = document.getElementById('post-description-modal');
    if (modal) {
      UIkit.modal(modal).hide();
      modal.remove();
    }
  }
}

