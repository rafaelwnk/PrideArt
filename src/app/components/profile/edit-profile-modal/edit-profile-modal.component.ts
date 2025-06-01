import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { AccountService } from '../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { ApiResponse } from '../../../models/api-response.model';
import { Router } from '@angular/router';
import { Security } from '../../../utils/security.utils';

@Component({
  selector: 'app-edit-profile-modal',
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './edit-profile-modal.component.html'
})
export class EditProfileModalComponent {
  @Input() user!: User;
  public editUserImage!: any;
  public busy = false;
  public form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(80),
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
    bio: new FormControl<string>('', [
      Validators.maxLength(255)
    ]),
    image: new FormControl<string>('')
  });

  constructor(
    private service: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.editUserImage = this.user.image;
    this.form.patchValue({
      name: this.user.name,
      email: this.user.email,
      identity: this.user.identity,
      bio: this.user.bio
    })
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        this.form.patchValue({ image: base64 });
        this.editUserImage = base64;
      };

      reader.readAsDataURL(file);
    }
  }

  submit() {
    this.busy = true;
    this.service.editProfile(this.form.value).subscribe({
      next: (data: ApiResponse<any>) => {
        this.busy = false;
        this.toastr.success(data.data.message)
      },
      error: (error: any) => {
        this.busy = false;
        console.log(error);
        this.toastr.error(error.error.errors)
      }
    })
    this.reset();
    window.location.reload();
  }

  deleteProfile() {
    this.busy = true;
    this.service.deleteProfile().subscribe({
      next: (data: ApiResponse<any>) => {
        this.busy = false;
        this.toastr.success(data.data.message)
        Security.clear();
      },
      error: (error: any) => {
        this.busy = false;
        console.log(error);
        this.toastr.error(error.error.errors)
      }
    })
    this.reset();
    this.router.navigate(['/login']);
  }
  

  reset() {
    this.ngOnInit();
  }
}
