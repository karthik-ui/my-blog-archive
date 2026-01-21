import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/auth.guard';

export const routes: Routes = [
 { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'auth/login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/signup', loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent) },
  { path: 'posts', loadComponent: () => import('./features/posts/posts-list/posts-list.component').then(m => m.PostsListComponent) },
  { path: 'posts/:id', loadComponent: () => import('./features/posts/post-details/post-details.component').then(m => m.PostDetailsComponent) },
  { path: 'posts/:id/comment', loadComponent: () => import('./features/posts/add-comment/add-comment.component').then(m => m.AddCommentComponent), canActivate: [AuthGuard] },
  { path: 'albums', loadComponent: () => import('./features/albums/albums-grid/albums-grid.component').then(m => m.AlbumsGridComponent) },
  { path: 'albums/:id', loadComponent: () => import('./features/albums/album-photos/album-photos.component').then(m => m.AlbumPhotosComponent) },
];
