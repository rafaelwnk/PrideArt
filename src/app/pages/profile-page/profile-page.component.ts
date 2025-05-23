import { Component } from '@angular/core';
import { PostCardComponent } from "../../components/post-card/post-card.component";

@Component({
  selector: 'app-profile-page',
  imports: [PostCardComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

}
