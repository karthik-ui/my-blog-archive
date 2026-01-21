import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';

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
  private router = inject(Router);
  private postsService = inject(PostsService);

  form = this.fb.group({
    body: ['', [Validators.required, Validators.minLength(10)]],
  });

  postId = Number(this.route.snapshot.paramMap.get('id'));
  post: any;
  success = '';
  error = '';
  loading = false;

  ngOnInit() {
    // Load post title for context
    this.postsService.getById(this.postId).subscribe(post => {
      this.post = post;
    });
  }

  /**
   * Submit comment form
   */
  submit() {
    // Check authentication
    if (!this.auth.currentUser) {
      this.error = 'You must be logged in to add a comment.';
      return;
    }

    if (!this.form.valid) {
      this.error = 'Please enter a comment (minimum 10 characters).';
      return;
    }

    this.loading = true;
    const comment = {
      postId: this.postId,
      body: this.form.value.body!,
      name: this.auth.currentUser.firstName + ' ' + this.auth.currentUser.lastName,
      email: this.auth.currentUser.username + '@example.com',
    };

    this.commentsService.add(comment).subscribe({
      next: () => {
        this.success = '✓ Comment added successfully!';
        this.form.reset();
        this.loading = false;
        
        // Redirect back to post details after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/posts', this.postId]);
        }, 2000);
      },
      error: (err) => {
        console.error('Error adding comment:', err);
        this.error = 'Failed to add comment. Please try again.';
        this.loading = false;
      },
    });
  }

  /**
   * Cancel and go back
   */
  cancel() {
    this.router.navigate(['/posts', this.postId]);
  }
}