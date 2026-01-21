/*
import { TestBed } from '@angular/core/testing';
import { AuthService, User } from './auth.service';
import { CommentsService } from '../posts/comments.service';
import { createSpyObj, spyOn } from '../../shared/utils/jasmine-helpers';

describe('AuthService', () => {
  let service: AuthService;
  let commentsServiceSpy: any;
  let localStorageGetItemSpy: jasmine.Spy;
  let localStorageSetItemSpy: jasmine.Spy;
  let localStorageRemoveItemSpy: jasmine.Spy;
  let sessionStorageClearSpy: jasmine.Spy;

  beforeEach(() => {
    commentsServiceSpy = createSpyObj('CommentsService', ['clearLocalComments']);

    localStorageGetItemSpy = spyOn(window.localStorage, 'getItem').and.returnValue(null);
    localStorageSetItemSpy = spyOn(window.localStorage, 'setItem').and.stub();
    localStorageRemoveItemSpy = spyOn(window.localStorage, 'removeItem').and.stub();
    sessionStorageClearSpy = spyOn(window.sessionStorage, 'clear').and.stub();

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CommentsService, useValue: commentsServiceSpy }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize demo user if no user exists', () => {
      localStorageGetItemSpy.and.returnValue(null);
      // Re-instantiate service to trigger constructor logic
      const newService = TestBed.inject(AuthService);
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('user', jasmine.any(String));
    });

    it('should not initialize demo user if user exists', () => {
      localStorageGetItemSpy.and.returnValue(JSON.stringify({ username: 'test' }));
      // Re-instantiate service to trigger constructor logic
      const newService = TestBed.inject(AuthService);
      expect(localStorageSetItemSpy).not.toHaveBeenCalled();
    });
  });

  describe('loadUser', () => {
    it('should return null when no user in localStorage', () => {
      localStorageGetItemSpy.and.returnValue(null);
      const newService = TestBed.inject(AuthService);
      expect(newService['loadUser']()).toBeNull();
    });

    it('should return parsed user from localStorage', () => {
      const user: User = { username: 'test', password: 'pass', firstName: 'Test', lastName: 'User' };
      localStorageGetItemSpy.and.returnValue(JSON.stringify(user));
      const newService = TestBed.inject(AuthService);
      expect(newService['loadUser']()).toEqual(user);
    });
  });

  describe('signup', () => {
    it('should save user to localStorage and update subject', () => {
      const signupUser: User = { username: 'test', password: 'pass', firstName: 'Test', lastName: 'User' };
      service.signup(signupUser);
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('user', JSON.stringify(signupUser));
      service.user$.subscribe(currentUser => {
        expect(currentUser).toEqual(signupUser);
      });
    });

    it('should return false for invalid credentials', () => {
      const invalidUser: User = { username: 'test', password: 'pass', firstName: 'Test', lastName: 'User' };
      localStorageGetItemSpy.and.returnValue(JSON.stringify(invalidUser));

      const result = service.login('test', 'wrongpass');

      expect(result).toBe(false);
    });

    it('should return false when no user exists', () => {
      localStorageGetItemSpy.and.returnValue(null);

      const result = service.login('test', 'pass');

      expect(result).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear user data and reset to demo user', () => {
      // Set up a logged in user
      const user: User = { username: 'test', password: 'pass', firstName: 'Test', lastName: 'User' };
      localStorageSetItemSpy.and.callThrough();
      service.login('test', 'pass');
      
      // Spy on methods
      const clearCommentsSpy = spyOn(commentsServiceSpy, 'clearLocalComments');
      const nextSpy = spyOn(service['_user$'], 'next');
      
      // Call logout
      service.logout();
      
      // Verify localStorage is cleared
      expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('user');
      
      // Verify sessionStorage is cleared
      expect(sessionStorageClearSpy).toHaveBeenCalled();
      
      // Verify comments are cleared
      expect(clearCommentsSpy).toHaveBeenCalled();
      
      // Verify user is set to null
      expect(nextSpy).toHaveBeenCalledWith(null);
      
      // Verify demo user is initialized (check if user is set to demo)
      expect(service.currentUser).toEqual(service['demoUser']);
    });
  });

  describe('currentUser getter', () => {
    it('should return current user', () => {
      const currentUser: User = { username: 'test', password: 'pass', firstName: 'Test', lastName: 'User' };
      localStorageGetItemSpy.and.returnValue(JSON.stringify(currentUser));
      const newService = TestBed.inject(AuthService);

      expect(newService.currentUser).toEqual(currentUser);
    });
  });

  describe('isAuthenticated getter', () => {
    it('should return true when user exists', () => {
      const authUser: User = { username: 'test', password: 'pass', firstName: 'Test', lastName: 'User' };
      localStorageGetItemSpy.and.returnValue(JSON.stringify(authUser));
      const newService = TestBed.inject(AuthService);

      expect(newService.isAuthenticated).toBe(true);
    });

    it('should return false when no user exists', () => {
      localStorageGetItemSpy.and.returnValue(null);
      const newService = TestBed.inject(AuthService);

      expect(newService.isAuthenticated).toBe(false);
    });
  });
});*/