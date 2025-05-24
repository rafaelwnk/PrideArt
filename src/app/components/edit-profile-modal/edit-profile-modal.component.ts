import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile-modal.component.html'
})
export class EditProfileModalComponent {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required
      ])],
      username: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(120),
        Validators.required
      ])],
      identity: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  submit() {
    window.location.reload();
  }

}
