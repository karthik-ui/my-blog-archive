import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Comment {
  id?: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  isLocal?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private readonly LOCAL_COMMENTS_KEY = 'app_local_comments';
  private localComments$ = new BehaviorSubject<Comment[]>(this.loadLocalComments());

  constructor(private api: ApiService) {}

  /**
   * Load comments for a post from API and merge with local comments
   * @param postId - Post ID
   */
  load(postId: number): Observable<Comment[]> {
    return this.api.get<Comment[]>(`/posts/${postId}/comments`).pipe(
      map(apiComments => {
        const localComments = this.localComments$.value.filter(c => c.postId === postId);
        // Put local comments first, then API comments
        return [...localComments, ...apiComments];
      })
    );
  }

  /**
   * Add a new comment and persist it locally
   * @param comment - Comment object
   */
  add(comment: Comment): Observable<any> {
    return this.api.post<any>('/comments', comment).pipe(
      map(response => {
        // Also save to local storage for persistence during session
        const localComments = this.loadLocalComments();
        const newComment: Comment = {
          ...comment,
          id: response.id || (Math.max(...localComments.map(c => c.id || 0), 0) + 1),
          isLocal: true
        };
        localComments.push(newComment);
        this.saveLocalComments(localComments);
        this.localComments$.next(localComments);
        return response;
      })
    );
  }

  /**
   * Get local comments stored in session
   */
  private loadLocalComments(): Comment[] {
    try {
      const stored = sessionStorage.getItem(this.LOCAL_COMMENTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save comments to session storage
   */
  private saveLocalComments(comments: Comment[]): void {
    try {
      sessionStorage.setItem(this.LOCAL_COMMENTS_KEY, JSON.stringify(comments));
    } catch {
      console.warn('Failed to save comments to session storage');
    }
  }

  /**
   * Clear local comments (called on logout)
   */
  clearLocalComments(): void {
    sessionStorage.removeItem(this.LOCAL_COMMENTS_KEY);
    this.localComments$.next([]);
  }
}