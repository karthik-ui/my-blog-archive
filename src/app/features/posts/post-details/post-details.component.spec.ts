import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { PostDetailsComponent } from './post-details.component';
import { PostsService } from '../posts.service';
import { CommentsService } from '../comments.service';
import { of } from 'rxjs';

describe('PostDetailsComponent', () => {
  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    const mockPostsService = {
      getById: () => of({}),
      posts$: of([])
    };

    const mockCommentsService = {
      load: () => of([]),
      comments$: of([])
    };

    await TestBed.configureTestingModule({
      imports: [PostDetailsComponent, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PostsService, useValue: mockPostsService },
        { provide: CommentsService, useValue: mockCommentsService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PostDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(PostDetailsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});