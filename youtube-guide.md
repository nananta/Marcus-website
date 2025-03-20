# Guide to Update YouTube Video Thumbnails

This guide will help you replace the placeholder YouTube thumbnails with your actual videos from your YouTube channel.

## Step 1: Find Your Video IDs

1. Go to your YouTube channel: https://www.youtube.com/@MarcAnanta
2. Open one of your videos that you want to showcase on your landing page
3. Look at the URL in your browser's address bar. It should look something like:
   ```
   https://www.youtube.com/watch?v=ABCDEFGHIJK
   ```
4. The part after `v=` is your video ID (in this example, it's `ABCDEFGHIJK`)
5. Copy this ID for each video you want to feature

## Step 2: Update the JavaScript File

1. Open the `script.js` file in a code editor
2. Find the `youtubeThumbnails` array (around line 35)
3. Replace the placeholder video IDs with your actual video IDs
4. Update the video titles, dates, views, and likes to match your actual videos
5. Update the `url` property to include the full URL to your specific video

### Example:

Replace this:

```javascript
const youtubeThumbnails = [
    {
        // This is a placeholder video ID - replace with actual video ID from Marcus's channel
        videoId: 'V3RT_hm0zes', 
        title: 'How I\'m Preparing for Law School in High School | Study With Me + Tips for Aspiring Lawyers',
        date: 'February 28, 2024',
        views: '3.5K',
        likes: '342',
        url: 'https://www.youtube.com/@MarcAnanta' // Replace with actual video URL
    },
    // More videos...
];
```

With your actual video data:

```javascript
const youtubeThumbnails = [
    {
        videoId: 'ABCDEFGHIJK', // Your actual video ID
        title: 'My Actual Video Title', // Your actual video title
        date: 'March 15, 2024', // Actual upload date
        views: '1.2K', // Actual view count
        likes: '156', // Actual like count
        url: 'https://www.youtube.com/watch?v=ABCDEFGHIJK' // Full URL to your video
    },
    // More videos...
];
```

## Step 3: Also Update the "Load More" Content

1. Find the `additionalYoutubeContent` array (around line 80)
2. Follow the same process to update the video ID, title, stats, and URL

## Step 4: Save and Test

1. Save the `script.js` file after making your changes
2. Refresh your landing page in a web browser
3. Verify that your actual YouTube video thumbnails are now displayed
4. Check that clicking on the thumbnails takes you to the correct video

## Notes:

- YouTube provides different thumbnail quality options:
  - `/maxresdefault.jpg` - Highest quality (may not be available for all videos)
  - `/hqdefault.jpg` - High quality (currently used in the code)
  - `/mqdefault.jpg` - Medium quality
  - `/default.jpg` - Standard quality

- If you want to feature more than two videos initially, you can add more objects to the `youtubeThumbnails` array, and then add more YouTube card elements to the HTML. 