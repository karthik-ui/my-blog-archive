import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../posts.service';
import { CommentsService } from '../comments.service';
import { trackById } from 'src/app/shared/utils/track-by';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  private commentsService = inject(CommentsService);
  private cdr = inject(ChangeDetectorRef);

  post: any = null;
  comments: any[] = [];
  loading = true;
  trackBy = trackById;
  postId = 0;

  ngOnInit() {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Loading post with ID:', this.postId);
    
    if (!this.postId) {
      console.error('No post ID provided');
      this.loading = false;
      this.cdr.markForCheck();
      return;
    }
    
    // Load post details
    this.postsService.getById(this.postId).subscribe({
      next: (post) => {
        console.log('✓ Post loaded successfully:', post);
        this.post = post;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('✗ Error loading post:', err);
        this.loading = false;
        this.post = { title: 'Error loading post', body: 'Please try again later', userId: 0 };
        this.cdr.markForCheck();
      }
    });

    // Load comments (API + local)
    this.commentsService.load(this.postId).subscribe({
      next: (comments) => {
        console.log('✓ Comments loaded successfully:', comments);
        this.comments = comments;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('✗ Error loading comments:', err);
        this.comments = [];
        this.cdr.markForCheck();
      }
    });
    
    // Add timeout safety - if still loading after 5 seconds, force it to hide
    setTimeout(() => {
      if (this.loading) {
        console.warn('Post loading timeout - hiding loading state');
        this.loading = false;
        this.cdr.markForCheck();
      }
    }, 5000);
  }

  /**
   * Format comment date/time
   */
  formatDate(date?: string): string {
    if (!date) return 'Just now';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Recently';
    }
  }
}