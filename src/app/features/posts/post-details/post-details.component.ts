import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { CommentsService } from '../comments.service';
import { trackById } from 'src/app/shared/utils/track-by';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent {
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  private commentsService = inject(CommentsService);

  post: any;
  comments: any[] = [];
  trackBy = trackById;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postsService.getById(id).subscribe(post => (this.post = post));
    this.commentsService.load(id).subscribe(comments => (this.comments = comments));
  }
}