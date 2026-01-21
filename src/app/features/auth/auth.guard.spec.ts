/*import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CommentsService } from '../posts/comments.service';
import { createSpyObj } from '../../shared/utils/jasmine-helpers';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: { currentUser: any };
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = { currentUser: null };
    routerSpy = createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: CommentsService, useValue: {} }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true when user is authenticated', () => {
      Object.defineProperty(authServiceSpy, 'currentUser', {
        get: () => ({ username: 'test', password: 'pass', firstName: 'Test', lastName: 'User' })
      });

      const result = guard.canActivate();

      expect(result).toBe(true);
    });

    it('should return UrlTree when user is not authenticated', () => {
      // Minimal mock for UrlTree
      const mockUrlTree = { toString: () => '/auth/login' } as unknown as UrlTree;
      Object.defineProperty(authServiceSpy, 'currentUser', {
        get: () => null
      });
      routerSpy.createUrlTree.and.returnValue(mockUrlTree);

      const result = guard.canActivate();

      const callArgs = routerSpy.createUrlTree.calls.mostRecent().args;
      expect(callArgs[0]).toBe('/auth/login');
      expect(callArgs[1]).toEqual({ queryParams: { returnUrl: location.pathname } });
      expect(result).toBe(mockUrlTree);
    });
  });
});*/