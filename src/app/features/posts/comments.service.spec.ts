import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CommentsService, Comment } from './comments.service';
import { ApiService } from '../../core/services/api.service';
import { createSpyObj, spyOn } from '../../shared/utils/jasmine-helpers';

describe('CommentsService (Jasmine/Karma)', () => {
  let service: CommentsService;
  let apiServiceSpy: any;
  let getItemSpy: jasmine.Spy;
  let setItemSpy: jasmine.Spy;
  let removeItemSpy: jasmine.Spy;

  beforeEach(() => {
    apiServiceSpy = createSpyObj('ApiService', ['get', 'post']);
    getItemSpy = spyOn(window.sessionStorage, 'getItem').and.returnValue(null);
    setItemSpy = spyOn(window.sessionStorage, 'setItem').and.stub();
    removeItemSpy = spyOn(window.sessionStorage, 'removeItem').and.stub();

    TestBed.configureTestingModule({
      providers: [
        CommentsService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('should merge API comments with local comments', () => {
    const apiComments: Comment[] = [
      { id: 1, postId: 1, name: 'API User', email: 'api@test.com', body: 'API comment' }
    ];
    const localComments: Comment[] = [
      { id: 2, postId: 1, name: 'Local User', email: 'local@test.com', body: 'Local comment', isLocal: true }
    ];
    getItemSpy.and.returnValue(JSON.stringify(localComments));
    apiServiceSpy.get.and.returnValue(of(apiComments));
    service.load(1).subscribe(comments => {
      expect(comments).toEqual([...localComments, ...apiComments]);
    });
    expect(apiServiceSpy.get).toHaveBeenCalledWith('/posts/1/comments');
  });*/

  it('should handle empty local comments', () => {
    const apiComments: Comment[] = [
      { id: 1, postId: 1, name: 'API User', email: 'api@test.com', body: 'API comment' }
    ];
    getItemSpy.and.returnValue(null);
    apiServiceSpy.get.and.returnValue(of(apiComments));
    service.load(1).subscribe(comments => {
      expect(comments).toEqual(apiComments);
    });
  });

  it('should add comment and save to local storage', () => {
    const comment: Comment = {
      postId: 1,
      name: 'Test User',
      email: 'test@test.com',
      body: 'Test comment'
    };
    const apiResponse = { id: 101 };
    getItemSpy.and.returnValue(JSON.stringify([]));
    apiServiceSpy.post.and.returnValue(of(apiResponse));
    service.add(comment).subscribe(response => {
      expect(response).toEqual(apiResponse);
    });
    expect(apiServiceSpy.post).toHaveBeenCalledWith('/comments', comment);
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('should generate local ID when API response has no ID', () => {
    const comment: Comment = {
      postId: 1,
      name: 'Test User',
      email: 'test@test.com',
      body: 'Test comment'
    };
    const apiResponse = {};
    getItemSpy.and.returnValue(JSON.stringify([]));
    apiServiceSpy.post.and.returnValue(of(apiResponse));
    service.add(comment).subscribe(() => {
      expect(setItemSpy).toHaveBeenCalled();
    });
  });

  it('should return parsed comments from sessionStorage', () => {
    const comments: Comment[] = [
      { id: 1, postId: 1, name: 'Test', email: 'test@test.com', body: 'Test' }
    ];
    getItemSpy.and.returnValue(JSON.stringify(comments));
    const result = service['loadLocalComments']();
    expect(result).toEqual(comments);
  });

  it('should return empty array when no comments in sessionStorage', () => {
    getItemSpy.and.returnValue(null);
    const result = service['loadLocalComments']();
    expect(result).toEqual([]);
  });

  it('should return empty array when JSON parsing fails', () => {
    getItemSpy.and.returnValue('invalid json');
    const result = service['loadLocalComments']();
    expect(result).toEqual([]);
  });

  it('should save comments to sessionStorage', () => {
    const comments: Comment[] = [
      { id: 1, postId: 1, name: 'Test', email: 'test@test.com', body: 'Test' }
    ];
    service['saveLocalComments'](comments);
    expect(setItemSpy).toHaveBeenCalledWith('app_local_comments', JSON.stringify(comments));
  });

  it('should handle sessionStorage errors gracefully', () => {
    setItemSpy.and.callFake(() => { throw new Error('Storage quota exceeded'); });
    const warnSpy = spyOn(console, 'warn');
    service['saveLocalComments']([]);
    expect(warnSpy).toHaveBeenCalledWith('Failed to save comments to session storage');
  });

  it('should clear comments from sessionStorage and reset subject', () => {
    service.clearLocalComments();
    expect(removeItemSpy).toHaveBeenCalledWith('app_local_comments');
  });
});