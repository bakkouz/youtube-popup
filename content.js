// This file is no longer needed as we're handling everything in the background script
// The content script is kept for future use if needed 

// Function to handle video clicks
function handleVideoClick(event) {
    // Find the closest anchor element
    const link = event.target.closest('a');
    if (!link) return;

    // Check if it's a video link
    if (link.href && link.href.includes('youtube.com/watch?v=')) {
        // Prevent default navigation
        event.preventDefault();
        event.stopPropagation();

        // Get the video ID
        const videoId = link.href.split('v=')[1].split('&')[0];
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

        // Open in popup
        window.open(embedUrl, 'YouTube Embed', 'width=800,height=600');

        // Force the current URL to stay as youtube.com
        if (window.location.href !== 'https://www.youtube.com/') {
            window.history.pushState({}, '', 'https://www.youtube.com/');
        }
    }
}

// Add click listener to the document
document.addEventListener('click', handleVideoClick, true);

// Prevent navigation when clicking video links
document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link && link.href && link.href.includes('youtube.com/watch?v=')) {
        event.preventDefault();
        event.stopPropagation();
    }
}, true); 