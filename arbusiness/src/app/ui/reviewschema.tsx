
import React from 'react';

const AVERAGE_RATING = 4.7; // Replace with actual fetched rating
const REVIEW_COUNT = 150; // Replace with actual fetched count
const BUSINESS_NAME = "Your Client's Business Name";

interface ReviewSchemaProps {
  businessName: string;
  ratingValue: number;
  reviewCount: number;
  url: string; // The canonical URL of the business or page
}

const ReviewSchema: React.FC<ReviewSchemaProps> = ({ 
  businessName, 
  ratingValue, 
  reviewCount,
  url
}) => {
  // Construct the JSON-LD object
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "LocalBusiness", // or Organization, Product, etc., depending on what you're reviewing
    "name": businessName,
    "url": url,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue.toFixed(1), // Ensure one decimal place (e.g., 4.9)
      "reviewCount": reviewCount.toString()
    }
    // You can add more fields like "image", "priceRange", "address", etc.
  };

  return (
    // Render the JSON-LD object inside a script tag
    <script 
      type="application/ld+json"
      // Use dangerouslySetInnerHTML to embed the raw JSON object
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ReviewSchema;