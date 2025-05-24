import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent {
  public form: FormGroup; 

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(120),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.required
      ])]
    });
  }

  submit() {
    this.router.navigate(['/login']);
  }

}
