import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { ApiResponse } from '../../../models/api-response.model';
import { Security } from '../../../utils/security.utils';
import { LoadingComponent } from "../../../components/shared/loading/loading.component";

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  public busy = false;
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

  constructor(
    private service: AccountService,
    private router: Router
  ) {}

  submit() {
    this.busy = true;
    this.service.login(this.form.value).subscribe({
      next: (data: ApiResponse<string>) => {
        Security.setToken(data.data);
        this.busy = false;
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log(error);
        this.busy = false;
      }
    });
  }
}
