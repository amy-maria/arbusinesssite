export default function GoogleRating () {
    return (
        {/* 1. Placeholder DIV: Place the DIV where you want the badge to appear */}
      <div id="google-review-badge-placeholder">
        {/* The external script will render the widget inside this DIV */}
      </div>

      {/* 2. Script Tag: Use Next.js's Script component */}
      <Script
        id="google-review-embed-script" // Unique ID for Next.js Script
        src="https://embed.yourreviewservice.com/widget-loader.js" // Replace with the service's script URL
        strategy="lazyOnload" // Load the script after the page becomes interactive
        onLoad={() => {
          // Optional: You might need to call a specific initialization function
          // window.initReviewWidget('your-widget-id');
        }}
      />
    )
}