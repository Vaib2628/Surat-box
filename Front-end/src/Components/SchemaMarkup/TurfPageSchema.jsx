// src/components/SchemaMarkup/TurfPageSchema.js
import React from 'react';
import { Helmet } from 'react-helmet';

const TurfPageSchema = ({ turfData }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": `${turfData.name} Cricket Ground`,
    "description": `Book ${turfData.name} cricket ground in ${turfData.area}, Surat. Features include ${turfData.amenities.join(', ')}.`,
    "url": `https://bookyourbox.vercel.app/venues/${turfData.area}`,
    "image": `https://bookyourbox.vercel.app/images/${turfData.image}`,
    // ... rest of your schema with dynamic data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default TurfPageSchema;