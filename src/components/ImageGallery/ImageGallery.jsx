import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <div>
      <ul>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              atl={tags}
              largeImage={largeImageURL}
              openModal={openModal}
            />
          );
        })}
      </ul>
    </div>
  );
};
