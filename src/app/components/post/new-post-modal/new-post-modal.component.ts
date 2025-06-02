import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-new-post-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-post-modal.component.html'
})
export class NewPostModalComponent {
  public hasImage = false;
  public postImage!: string;
  public form: FormGroup = new FormGroup({
    title: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(120),
      Validators.required
    ]),
    image: new FormControl<string>('', [
      Validators.required
    ]),
    description: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(355),
      Validators.required
    ])
  })

  constructor(
    private service: PostService,
    private toastr: ToastrService
  ) {}

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        this.form.patchValue({ image: base64 });
        this.postImage = base64;
        this.hasImage = true;
      };

      reader.readAsDataURL(file);
    }
  }

  submit() {
    this.service.createPost(this.form.value).subscribe({
      next: (data: ApiResponse<any>) => {
        this.toastr.success(data.data.message)
      }, 
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.errors)
      }
    })
  }
}
 