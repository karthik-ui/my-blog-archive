import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'theme_pref';
  theme = signal<'light' | 'dark'>(this.load());

  constructor() {
    // effect runs whenever `theme()` changes
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(this.KEY, t);
    });
  }

  toggle() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }

  private load(): 'light' | 'dark' {
    const raw = localStorage.getItem(this.KEY);
    return raw === 'dark' ? 'dark' : 'light';
  }
}