import { Component, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artists-card',
  imports: [RouterModule],
  templateUrl: './artists-card.component.html'
})
export class ArtistsCardComponent {
  @Input() user!: User;
}
