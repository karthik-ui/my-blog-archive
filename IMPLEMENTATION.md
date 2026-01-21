# Blog Archive - Angular Application

A beautiful, modern blog and photo archive web application built with Angular 21 and styled with custom animations and gradients.

## Features Implemented

### ✅ Authentication System
- **Signup Page**: Create new accounts with first name, last name, username, and password
- **Login Page**: Authenticate with stored credentials
- **Logout Functionality**: Clear session and redirect to login
- **User Avatar**: Display user initials in navbar
- **Protected Routes**: Auth guard on add-comment page

### ✅ Blog Features
- **Posts List**: Display first 10 posts with beautiful card layout
- **Pagination**: Navigate through posts with prev/next buttons
- **Post Details**: View full post content and related comments
- **Comments System**: View and add comments on posts
- **Comment Persistence**: Comments persist during the session using sessionStorage

### ✅ UI/UX Improvements
- **Modern Navbar**: Responsive navigation with user info and mobile hamburger menu
- **Card-based Design**: Posts displayed as interactive cards with hover effects
- **Loading Skeletons**: Beautiful loading states while fetching data
- **Empty States**: User-friendly empty state messages
- **Form Validation**: Client-side validation with error messages
- **Animations**: Smooth transitions and animations throughout the app
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop

### ✅ Technical Implementation
- **Standalone Components**: All components are standalone (Angular 21)
- **Reactive Forms**: Proper form handling with validation
- **Services**: Well-structured services for API calls (Posts, Comments, Auth)
- **Error Interceptor**: Global error handling
- **Observable Patterns**: Using RxJS observables and subjects
- **CSS Animations**: Custom SCSS with gradient backgrounds and smooth transitions

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── interceptors/
│   │   │   └── error.interceptor.ts
│   │   └── services/
│   │       ├── api.service.ts
│   │       └── theme.service.ts
│   ├── features/
│   │   ├── albums/ (bonus features)
│   │   ├── auth/
│   │   │   ├── auth.guard.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── login/
│   │   │   └── signup/
│   │   └── posts/
│   │       ├── posts.service.ts
│   │       ├── comments.service.ts
│   │       ├── posts-list/
│   │       ├── post-details/
│   │       └── add-comment/
│   ├── shared/
│   │   ├── components/
│   │   │   └── navbar.component.ts
│   │   └── utils/
│   │       └── track-by.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.scss
├── styles.scss
└── main.ts
```

## Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm 9+
- Angular CLI 21

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

The application will be available at `http://localhost:4200`

## Demo Credentials

For testing, use these credentials after signing up:
- **Username**: demo
- **Password**: demo123

Or create your own account on the signup page!

## API Source

This project uses the free JSONPlaceholder API: https://jsonplaceholder.typicode.com

- Posts: `/posts`
- Comments: `/posts/{id}/comments`

## Key Features Details

### Authentication
- Credentials stored in localStorage
- Persistent login across sessions
- Logout clears all session data
- Password confirmation on signup

### Comments
- Display API comments and user-added comments
- New comments appear at the top
- Comments persist during session (sessionStorage)
- Comments cleared on logout
- Character count and validation

### Responsive Design
- Mobile hamburger menu in navbar
- Touch-friendly buttons and inputs
- Optimized grid layouts for all screen sizes
- Accessible form inputs with proper labels

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading of routes
- TrackBy function for list optimization
- Efficient change detection with OnPush strategy
- CSS animations using transforms (GPU accelerated)

## Coding Standards

- ✅ Clean, modular code structure
- ✅ Proper TypeScript typing
- ✅ JSDoc comments for all public methods
- ✅ DRY principle followed throughout
- ✅ SCSS organized with variables and mixins
- ✅ Accessible HTML with ARIA labels
- ✅ Proper error handling

## Future Enhancements

- [ ] Dark mode support
- [ ] Advanced search and filtering
- [ ] User profile page
- [ ] Comment editing/deletion
- [ ] Post search functionality
- [ ] Pagination with last/first buttons
- [ ] Email notifications
- [ ] Database integration instead of localStorage

## Development

### Adding a New Feature

1. Create service in appropriate feature folder
2. Create components as standalone
3. Add proper TypeScript interfaces
4. Create SCSS file with component styles
5. Add comments and documentation
6. Test thoroughly
7. Commit with meaningful message

### Styling Guidelines

- Use CSS variables defined in styles.scss
- Follow BEM naming convention for classes
- Keep SCSS organized with proper nesting
- Use mixins for repeated patterns
- Ensure accessibility with proper contrast

## License

This project is created for educational purposes.

---

**Created**: January 21, 2026  
**Framework**: Angular 21  
**Styling**: SCSS with CSS Grid & Flexbox  
**State Management**: RxJS Observables  
**Storage**: localStorage (auth) & sessionStorage (comments)
