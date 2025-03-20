# Marcus Ananta - Personal Landing Page

A modern, responsive landing page for Marcus Ananta, a Simi Valley high school student and aspiring law professional. This page showcases Marcus's social media content, journey, and provides contact information.

## Features

- Responsive design that works on all devices
- Social media content integration
- Interactive timeline showing Marcus's journey
- Contact form for reaching out
- Smooth animations and transitions
- Platform-specific content filtering

## Files Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling
- `script.js` - JavaScript for interactivity

## Getting Started

### Basic Viewing

To view the website locally:

1. Clone or download this repository
2. Open `index.html` in your browser

### Local Development Server (Recommended)

For a better development experience with auto-refresh:

1. Ensure you have [Node.js](https://nodejs.org/) installed (version 14 or higher)
2. Clone this repository
3. Open a terminal in the project directory
4. Install dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. The site will open automatically in your browser at `http://localhost:3000`
7. Any changes to HTML, CSS, or JavaScript files will automatically refresh the browser

### Production Preview

To test the production version locally:

```
npm start
```

This will start a static server at `http://localhost:5000` similar to how the site will behave when deployed.

## Customization

### Personalizing Content

- Replace placeholder text and images with actual content
- Update social media links in the header and footer
- Modify the timeline content in the "My Journey" section
- Update contact information in the "Get In Touch" section

### Social Media Integration

The current implementation uses static placeholders for social media content. To integrate real social media feeds:

1. For Instagram: Use Instagram Basic Display API or Instagram Graph API
2. For TikTok: Use TikTok API
3. For YouTube: Use YouTube Data API

Implementation examples:

```javascript
// Example for fetching Instagram posts (requires proper authentication)
async function fetchInstagramPosts() {
    const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayInstagramPosts(data.data);
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
    }
}

// Example for YouTube
async function fetchYouTubeVideos() {
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const channelId = 'YOUR_CHANNEL_ID';
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayYouTubeVideos(data.items);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
    }
}
```

### Color Scheme

The color scheme can be easily modified by changing the CSS variables in the `:root` section of `styles.css`:

```css
:root {
    --primary-color: #1a237e;
    --secondary-color: #f5f5f5;
    --accent-color: #ff5722;
    --text-color: #333;
    --text-light: #757575;
    --white: #ffffff;
    /* ... */
}
```

## Browser Compatibility

- Chrome: Latest version
- Firefox: Latest version
- Safari: Latest version
- Edge: Latest version
- Mobile browsers: iOS Safari, Chrome for Android

## Deployment

### Option 1: Traditional Web Hosting

To deploy this website to a traditional web server:

1. Upload all files to your web hosting provider
2. Ensure your domain points to the directory containing these files
3. Test all functionality on the live site

### Option 2: GitHub Pages (Recommended)

This repository is set up for easy deployment to GitHub Pages:

1. Fork or clone this repository to your GitHub account
2. Go to your repository settings
3. Navigate to "Pages" in the left sidebar
4. Under "Build and deployment", select:
   - Source: "GitHub Actions"
   - Branch: "main" (or your default branch)
5. The site will be automatically deployed when you push to the main branch
6. After deployment, your site will be available at `https://[your-username].github.io/[repository-name]/`

#### Manual Deployment

You can also manually trigger a deployment:
1. Go to the "Actions" tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and select your branch
4. The deployment will begin and provide a URL when complete

## Custom Domain (Optional)

To use a custom domain with your GitHub Pages site:

1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Custom domain", enter your domain name
4. Add the following DNS records with your domain provider:
   - For apex domain (example.com): Add an A record pointing to the GitHub Pages IP addresses
   - For subdomains (www.example.com): Add a CNAME record pointing to `[your-username].github.io`
5. Save your changes and wait for DNS propagation

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/) (Montserrat, Playfair Display)
- Background image: [Unsplash](https://unsplash.com/) 