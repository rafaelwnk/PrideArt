import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-page.component.html'
})
export class SignUpPageComponent {
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
    ]),
    password: new FormControl<string>('', [
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.required
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.required
    ])
  })

  constructor(private router: Router) {}

  submit() {
    this.router.navigate(['/login']);
  }

}
