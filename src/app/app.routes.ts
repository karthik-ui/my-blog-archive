import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { PostsListComponent } from './features/posts/posts-list/posts-list.component';
import { PostDetailsComponent } from './features/posts/post-details/post-details.component';
import { AuthGuard } from './features/auth/auth.guard';
import { AddCommentComponent } from './features/posts/add-comment/add-comment.component';
import { AlbumsGridComponent } from './features/albums/albums-grid/albums-grid.component';
import { AlbumPhotosComponent } from './features/albums/album-photos/album-photos.component';

export const routes: Routes = [
 { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
  { path: 'posts/:id/comment', component: AddCommentComponent, canActivate: [AuthGuard] },
  { path: 'albums', component: AlbumsGridComponent },
  { path: 'albums/:id', component: AlbumPhotosComponent },
];
