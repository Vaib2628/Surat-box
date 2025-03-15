// src/components/SchemaMarkup/HomePageSchema.js
import React from 'react';
import { Helmet } from 'react-helmet';

const HomePageSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Box cricket ground in surat",
    "description": "Book cricket turfs in Surat online. Compare prices, check availability, and secure your cricket box instantly.",
    "url": "https://bookyourbox.vercel.app",
    "logo": "https://bookyourbox.vercel.app/logo.png",
    "telephone": "+919316726049",
    "email": "bookyourbox2025@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "L-102 Anjani residency, Jahangirpura",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395005",
      "addressCountry": "IN"
    },
    // ... rest of your schema
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default HomePageSchema;