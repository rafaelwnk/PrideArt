import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile-modal.component.html'
})
export class EditProfileModalComponent {
  public form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(80),
      Validators.required
    ]),
    username: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required
    ]),
    email: new FormControl<string>('', [
      Validators.email,
      Validators.minLength(8),
      Validators.maxLength(120),
      Validators.required
    ]),
    identity: new FormControl<string>('', [
      Validators.required
    ])
  });

  constructor() {}

  submit() {
    window.location.reload();
  }

}
