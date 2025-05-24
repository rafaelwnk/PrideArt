import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, ReactiveFormsModule,  CommonModule],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.required
      ])]
    })
  }

  submit() {
    this.router.navigate(['/']);
  }
}
