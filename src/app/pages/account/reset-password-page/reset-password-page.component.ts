import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-reset-password-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent {
  public form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.email,
      Validators.minLength(8),
      Validators.maxLength(120),
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

  constructor(
    private service: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  submit() {
    this.service.resetPassword(this.form.value).subscribe({
      next: (data: ApiResponse<string>) => {
        this.toastr.success(data.data);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
