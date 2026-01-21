import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentsService } from '../posts/comments.service';

export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'user';
  private _user$ = new BehaviorSubject<User | null>(this.loadUser());
  user$ = this._user$.asObservable();

  private demoUser: User = {
    username: 'demo',
    password: 'demo123',
    firstName: 'Demo',
    lastName: 'User',
  };

  private commentsService = inject(CommentsService);

  constructor() {
    this.initializeDemoUser();
  }

  private initializeDemoUser(): void {
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify(this.demoUser));
    }
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : null;
  }

  /**
   * Register a new user and save credentials
   * @param user - User registration data
   */
  signup(user: User) {
    localStorage.setItem(this.KEY, JSON.stringify(user));
    this._user$.next(user);
  }

  /**
   * Authenticate user with stored credentials
   * @param username - Username
   * @param password - Password
   */
  login(username: string, password: string): boolean {
    const stored = this.loadUser();
    if (stored && stored.username === username && stored.password === password) {
      this._user$.next(stored);
      return true;
    }
    return false;
  }

  /**
   * Logout user and clear session data
   */
  logout() {
    localStorage.removeItem(this.KEY);
    sessionStorage.clear();
    this.commentsService.clearLocalComments();
    this._user$.next(null);
    this.initializeDemoUser();
  }

  /**
   * Get current user
   */
  get currentUser(): User | null {
    return this._user$.value;
  }

  /**
   * Check if user is logged in
   */
  get isAuthenticated(): boolean {
    return this._user$.value !== null;
  }
}