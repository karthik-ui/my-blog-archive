import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  private loadUser(): User | null {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : null;
  }

  signup(user: User) {
    localStorage.setItem(this.KEY, JSON.stringify(user));
    this._user$.next(user);
  }

  login(username: string, password: string): boolean {
    const stored = this.loadUser();
    if (stored && stored.username === username && stored.password === password) {
      this._user$.next(stored);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.KEY);
    sessionStorage.clear();
    this._user$.next(null);
  }

  get currentUser(): User | null {
    return this._user$.value;
  }
}