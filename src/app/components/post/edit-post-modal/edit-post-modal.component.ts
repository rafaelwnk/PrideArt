import { Component, DestroyRef, inject, Input, SimpleChanges } from '@angular/core';
import { Post } from '../../../models/post.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/api-response.model';
import { CommonModule } from '@angular/common';

declare var UIkit: any;

@Component({
  selector: 'app-edit-post-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-post-modal.component.html'
})
export class EditPostModalComponent {
  @Input() post!: Post;
  public postImage!: string;
  public form: FormGroup = new FormGroup({
    title: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(120),
      Validators.required
    ]),
    image: new FormControl<string>(''),
    description: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(355),
      Validators.required
    ])
  })

  constructor(
    private service: PostService,
    private toastr: ToastrService
  ) {
    inject(DestroyRef).onDestroy(() => {
      this.destroyModal();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && this.post) {
      this.postImage = this.post.image;
      this.form.patchValue({
        title: this.post.title,
        description: this.post.description
      })
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        this.form.patchValue({ image: base64 });
        this.postImage = base64;
      };

      reader.readAsDataURL(file);
    }
  }

  submit() {
    this.service.editPost(this.form.value, this.post.id).subscribe({
      next: (data: ApiResponse<any>) => {
        this.toastr.success(data.data.message)
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.errors)
      }
    })
  }

  deletePost() {
    this.service.deletePost(this.post.id).subscribe({
      next: (data: ApiResponse<any>) => {
        this.toastr.success(data.data.message)
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.error.errors)
      }
    })
  }

  reset() {
    this.postImage = this.post.image;
    this.form.patchValue({
      title: this.post.title,
      image: this.post.image,
      description: this.post.description
    })
  }

  destroyModal() {
    const modal = document.getElementById('edit-post-modal');
    if (modal) {
      UIkit.modal(modal).hide();
      modal.remove();
    }
  }
}
