import React from 'react';
import { Helmet } from 'react-helmet-async';
import seoData from './metasDetails.json';

const SEO = ({ page = 'default' }) => {
  let meta = { ...seoData.default };

  if (page && seoData.pages && seoData.pages[page]) {
    const specificPageData = seoData.pages[page];
    meta = { ...meta, ...specificPageData };
    if (specificPageData.og) {
      meta.og = { ...meta.og, ...specificPageData.og };
    }
    if (specificPageData.twitter) {
      meta.twitter = { ...meta.twitter, ...specificPageData.twitter };
    }
    if (specificPageData.schema) {
      meta.schema = specificPageData.schema;
    } else {
      delete meta.schema;
    }
  }

  return (
    <Helmet>
      <title>{meta.title}</title>
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.keywords && <meta name="keywords" content={meta.keywords} />} {/* Added check */}
      <meta name="author" content="Gateway Abroad" />
      {meta.canonical && <link rel="canonical" href={meta.canonical} />} {/* Added check */}

      {meta.og && (
        <>
          <meta property="og:type" content={meta.og.type || 'website'} /> {/* Provide default if missing */}
          <meta property="og:url" content={meta.og.url || meta.canonical || window.location.href} /> {/* Fallback logic */}
          <meta property="og:title" content={meta.og.title || meta.title} /> {/* Fallback logic */}
          {meta.og.description && <meta property="og:description" content={meta.og.description} />}
          {meta.og.image && <meta property="og:image" content={meta.og.image} />}
          {meta.og.site_name && <meta property="og:site_name" content={meta.og.site_name} />}
        </>
      )}

      {meta.twitter && (
        <>
          <meta name="twitter:card" content={meta.twitter.card || 'summary'} /> {/* Provide default */}
          <meta name="twitter:title" content={meta.twitter.title || meta.title} /> {/* Fallback logic */}
          {meta.twitter.description && <meta name="twitter:description" content={meta.twitter.description} />}
          {meta.twitter.image && <meta name="twitter:image" content={meta.twitter.image} />}
        </>
      )}

      {meta.schema && (
        <script type="application/ld+json">
          {JSON.stringify(meta.schema)}
        </script>
      )}
  </Helmet>
  );
};

export default SEO;