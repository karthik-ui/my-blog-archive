import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PostsService } from './posts.service';
import { ApiService } from 'src/app/core/services/api.service';
import { createSpyObj } from '../../shared/utils/jasmine-helpers';

describe('PostsService (Jasmine/Karma)', () => {
  let service: PostsService;
  let apiServiceSpy: any;

  beforeEach(() => {
    apiServiceSpy = createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call api.get with correct params for page 1', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    apiServiceSpy.get.and.returnValue(of(mockPosts));
    service.load(1);
    expect(apiServiceSpy.get).toHaveBeenCalledWith('/posts', { _start: 0, _limit: 10 });
  });

  it('should call api.get with correct params for page 2', () => {
    const mockPosts = [{ id: 11, title: 'Test Post' }];
    apiServiceSpy.get.and.returnValue(of(mockPosts));
    service.load(2);
    expect(apiServiceSpy.get).toHaveBeenCalledWith('/posts', { _start: 10, _limit: 10 });
  });

  it('should call api.get with default page 1', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    apiServiceSpy.get.and.returnValue(of(mockPosts));
    service.load();
    expect(apiServiceSpy.get).toHaveBeenCalledWith('/posts', { _start: 0, _limit: 10 });
  });

  it('should call api.get with correct path and return post', () => {
    const mockPost = { id: 1, title: 'Test Post', body: 'Test body' };
    apiServiceSpy.get.and.returnValue(of(mockPost));
    service.getById(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });
    expect(apiServiceSpy.get).toHaveBeenCalledWith('/posts/1');
  });

  it('should return fallback post when api fails', () => {
    apiServiceSpy.get.and.returnValue(throwError(() => new Error('API Error')));
    service.getById(1).subscribe(post => {
      expect(post).toEqual({
        id: 1,
        title: 'Post #1',
        body: 'This is post number 1. The post content should appear here when the API is working properly.',
        userId: 1
      });
    });
  });

  it('should emit posts when load is called', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    apiServiceSpy.get.and.returnValue(of(mockPosts));
    service.load(1);
    service.posts$.subscribe(posts => {
      if (posts.length > 0) {
        expect(posts).toEqual(mockPosts);
      }
    });
  });
});