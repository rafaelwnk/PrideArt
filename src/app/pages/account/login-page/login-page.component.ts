import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, ReactiveFormsModule,  CommonModule],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  public form: FormGroup = new FormGroup({
    username: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.required
    ])
  });

  constructor(private router: Router) {}

  submit() {
    this.router.navigate(['/']);
  }
}
