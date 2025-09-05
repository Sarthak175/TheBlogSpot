# The Blog Spot

A clean, minimal blog application built with React featuring responsive design and modern UI components.

## Features

- **Responsive Navigation** - Clean navbar with hamburger menu for mobile
- **Post Management** - Create, edit, and delete blog posts
- **Card Layout** - Beautiful post cards with hover effects
- **Authentication UI** - Login/Signup pages (UI only)
- **Toast Notifications** - User feedback for all actions
- **Empty States** - Friendly messages when no posts exist
- **Mobile Responsive** - Optimized for all screen sizes

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   ├── PostCard.js        # Individual post card
│   └── Toast.js           # Notification component
├── pages/
│   ├── Home.js            # Homepage with post list
│   ├── CreatePost.js      # Create new post
│   ├── EditPost.js        # Edit existing post
│   └── Login.js           # Authentication page
├── App.js                 # Main app component
└── index.js               # Entry point
```

## Design Features

- **Color Scheme**: Blue (#3b82f6), White, Gray tones
- **Typography**: System fonts for optimal readability
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle box shadows for depth
- **Animations**: Smooth hover effects and transitions
- **Responsive**: Mobile-first design approach

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner