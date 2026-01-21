import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { AddCommentComponent } from './add-comment.component';
import { CommentsService } from '../comments.service';
import { AuthService } from '../../auth/auth.service';
import { PostsService } from '../posts.service';
import { of } from 'rxjs';

describe('AddCommentComponent', () => {
  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    const mockCommentsService = {
      addComment: () => of({})
    };

    const mockAuthService = {
      user$: of(null),
      currentUser: { id: 1, username: 'test' }
    };

    const mockPostsService = {
      getById: () => of({})
    };

    await TestBed.configureTestingModule({
      imports: [AddCommentComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CommentsService, useValue: mockCommentsService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: PostsService, useValue: mockPostsService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AddCommentComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(AddCommentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});