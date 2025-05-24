import { Component } from '@angular/core';
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { EditProfileModalComponent } from "../../components/edit-profile-modal/edit-profile-modal.component";

@Component({
  selector: 'app-profile-page',
  imports: [PostCardComponent, EditProfileModalComponent],
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent {

}
