/*import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from './app.routes';
import { AuthGuard } from './features/auth/auth.guard';

describe('App Routes', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [AuthGuard]
    });

    router = TestBed.inject(Router);
  });

  it('should be configured', () => {
    expect(routes).toBeDefined();
    expect(routes.length).toBeGreaterThan(0);
  });

  describe('route configuration', () => {
    it('should have root redirect to posts', () => {
      const rootRoute = routes.find(route => route.path === '');
      expect(rootRoute).toBeDefined();
      expect(rootRoute?.redirectTo).toBe('posts');
      expect(rootRoute?.pathMatch).toBe('full');
    });

    it('should have posts route', () => {
      const postsRoute = routes.find(route => route.path === 'posts');
      expect(postsRoute).toBeDefined();
      expect(postsRoute?.component).toBeDefined();
    });

    it('should have posts detail route', () => {
      const postsDetailRoute = routes.find(route => route.path === 'posts/:id');
      expect(postsDetailRoute).toBeDefined();
      expect(postsDetailRoute?.component).toBeDefined();
    });

    it('should have posts comment route with guard', () => {
      const postsCommentRoute = routes.find(route => route.path === 'posts/:id/comment');
      expect(postsCommentRoute).toBeDefined();
      expect(postsCommentRoute?.component).toBeDefined();
      expect(postsCommentRoute?.canActivate).toEqual([AuthGuard]);
    });

    it('should have albums routes', () => {
      const albumsRoute = routes.find(route => route.path === 'albums');
      const albumsDetailRoute = routes.find(route => route.path === 'albums/:id');

      expect(albumsRoute).toBeDefined();
      expect(albumsRoute?.component).toBeDefined();
      expect(albumsDetailRoute).toBeDefined();
      expect(albumsDetailRoute?.component).toBeDefined();
    });

    it('should have auth routes', () => {
      const loginRoute = routes.find(route => route.path === 'auth/login');
      const signupRoute = routes.find(route => route.path === 'auth/signup');

      expect(loginRoute).toBeDefined();
      expect(loginRoute?.component).toBeDefined();
      expect(signupRoute).toBeDefined();
      expect(signupRoute?.component).toBeDefined();
    });
  });

  describe('navigation', () => {
    it('should navigate to posts', async () => {
      await router.navigate(['/posts']);
      expect(router.url).toBe('/posts');
    });

    it('should navigate to albums', async () => {
      await router.navigate(['/albums']);
      expect(router.url).toBe('/albums');
    });

    it('should navigate to login', async () => {
      await router.navigate(['/auth/login']);
      expect(router.url).toBe('/auth/login');
    });

    it('should redirect root to posts', async () => {
      await router.navigate(['/']);
      expect(router.url).toBe('/posts');
    });
  });
});*/