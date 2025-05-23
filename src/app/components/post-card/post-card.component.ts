import { Component } from '@angular/core';
import { PostDescriptionModalComponent } from "../post-description-modal/post-description-modal.component";

@Component({
  selector: 'app-post-card',
  imports: [PostDescriptionModalComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

}
