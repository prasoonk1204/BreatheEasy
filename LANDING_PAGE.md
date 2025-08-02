# BreatheEasy Landing Page

## Overview

The BreatheEasy landing page is a dedicated marketing page that introduces users to the air quality monitoring application. It provides a comprehensive overview of the project's features, contributors, and purpose.

## Features

### ✅ Hero Section
- Eye-catching headline with clear value proposition
- Call-to-action buttons to launch the app or view GitHub repository
- Animated background elements for visual appeal
- Responsive design for all screen sizes

### ✅ About Section
- Detailed explanation of what BreatheEasy is and its purpose
- Key benefits and use cases
- Visual elements highlighting the importance of air quality monitoring

### ✅ Features Section
- Grid layout showcasing 6 key features:
  - Live AQI Dashboard
  - Global City Search
  - Interactive Maps
  - Health Suggestions
  - 7-Day Forecast
  - Pollutant Breakdown
- Each feature includes an icon, title, and description

### ✅ Contributors Section
- Dedicated section for the project maintainer
- Grid layout showing all contributors with:
  - GitHub avatars
  - Username links to GitHub profiles
  - Commit statistics
  - Lines of code contributed

### ✅ Footer
- Project links and resources
- GitHub repository link
- Documentation links
- License information
- Copyright notice

## Design Guidelines

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Flexible typography scaling
- Touch-friendly navigation

### Visual Consistency
- Uses existing color scheme (emerald/green theme)
- Consistent with current app styling
- Dark/light mode support
- Smooth transitions and animations

### Accessibility
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- High contrast ratios

## Technical Implementation

### Routing
- Landing page is now the default route (`/`)
- Main app routes moved to `/dashboard/*`
- Updated all navigation links accordingly

### Styling
- Built with Tailwind CSS
- Custom CSS animations for blob effects
- Consistent with existing design system

### Components
- Single-page component with multiple sections
- Reusable icon components from Lucide React
- Theme toggle integration

## Navigation Flow

1. **Landing Page (`/`)** - Marketing and introduction
2. **Dashboard (`/dashboard`)** - Main application
3. **App Features (`/dashboard/*`)** - All existing app functionality

## Files Modified

- `src/pages/LandingPage.jsx` - New landing page component
- `src/App.jsx` - Updated routing configuration
- `src/components/Navbar.jsx` - Updated navigation links
- `src/components/Sidebar.jsx` - Updated navigation links
- `src/index.css` - Added blob animation styles

## Usage

Users can now:
1. Visit the landing page to learn about BreatheEasy
2. Click "Launch App" to access the main dashboard
3. Click "View on GitHub" to explore the source code
4. Navigate through all app features from the dashboard

The landing page serves as an effective introduction to the project while maintaining seamless navigation to the full application. 