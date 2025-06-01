import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { ApiResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-post-modal',
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './post-modal.component.html'
})
export class PostModalComponent {
  public busy = false;
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
    this.busy = true;
    this.service.createPost(this.form.value).subscribe({
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
  }
}
 