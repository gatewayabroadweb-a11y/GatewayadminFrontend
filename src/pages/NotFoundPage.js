import React from 'react';
import { Link } from 'react-router-dom';

import DocumentMeta from 'react-document-meta';

const NotFoundPage = () => {
  const meta = {
    title: '404',
    description: 'Not Found page',
    // Add more meta tags as needed
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center  h-100">
      <DocumentMeta {...meta} />
      <img
        src="https://cdn1.iconfinder.com/data/icons/photo-stickers-words/128/word_18-1024.png"
        alt="Not Found"
        className="img-fluid mb-50"
        style={{ maxWidth: '50vh' }}
      />
      <p className="mb-50">
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};
export default NotFoundPage;