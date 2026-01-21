import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsListComponent } from './posts-list.component';
import { PostsService } from '../posts.service';
import { of } from 'rxjs';

describe('PostsListComponent', () => {
  beforeEach(async () => {
    const mockPostsService = {
      posts$: of([]),
      load: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [PostsListComponent, RouterTestingModule],
      providers: [
        { provide: PostsService, useValue: mockPostsService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PostsListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(PostsListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});