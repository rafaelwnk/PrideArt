import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { ApiResponse } from '../../../models/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from "../../../components/shared/loading/loading.component";

@Component({
  selector: 'app-sign-up-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './sign-up-page.component.html'
})
export class SignUpPageComponent {
  public busy = false;
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

  constructor(
    private service: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submit() {
    this.busy = true;
    this.service.register(this.form.value).subscribe({
      next: (data: ApiResponse<string>) => {
        this.busy = false;
        this.toastr.success(data.data);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.log(error);
        this.busy = false;
      } 
    });
  }

}
