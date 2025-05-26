import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-artists-card',
  imports: [],
  templateUrl: './artists-card.component.html'
})
export class ArtistsCardComponent {
  @Input() user!: User;
  @Input() isFollowing: boolean = false;
}
