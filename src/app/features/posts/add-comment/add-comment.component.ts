import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  private fb = inject(FormBuilder);
  private commentsService = inject(CommentsService);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    body: ['', Validators.required],
  });

  postId = Number(this.route.snapshot.paramMap.get('id'));
  success = '';
  error = '';

  submit() {
    if (!this.auth.currentUser) {
      this.error = 'You must be logged in to comment.';
      return;
    }

    if (this.form.valid) {
      const comment = {
        postId: this.postId,
        body: this.form.value.body!,
        name: this.auth.currentUser.firstName + ' ' + this.auth.currentUser.lastName,
        email: this.auth.currentUser.username + '@example.com',
      };

      this.commentsService.add(comment).subscribe({
        next: () => {
          this.success = 'Comment added!';
          this.form.reset();
        },
        error: () => {
          this.error = 'Failed to add comment.';
        },
      });
    }
  }
}