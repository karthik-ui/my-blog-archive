import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  user$ = this.authService.user$;
  isOpen = false;

  /**
   * Get user initials for avatar display
   */
  getUserInitials(): string {
    const user = this.authService.currentUser;
    if (!user) return '';
    return (user.firstName[0] + user.lastName[0]).toUpperCase();
  }

  /**
   * Toggle mobile menu
   */
  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * Handle logout and redirect to login
   */
  logout(): void {
    this.authService.logout();
    this.isOpen = false;
    this.router.navigate(['/auth/login']);
  }
}