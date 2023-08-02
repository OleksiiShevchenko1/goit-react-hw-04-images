import React from 'react';

export const ImageGalleryItem = ({ id, url, tags, largeImage, openModal }) => {
  return (
    <li>
      <img
        src={url}
        alt={tags}
        onClick={() => {
          openModal({ largeImage });
        }}
      />
    </li>
  );
};
