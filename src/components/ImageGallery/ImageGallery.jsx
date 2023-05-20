// import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';
import { getGallery } from 'services/GetGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Button from '../Button/Button';
// import { ToastContainer, toast } from 'react-toastify';


export default function ImageGallery({searchText}) {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    setIsLoading(true);

    getGallery(searchText, page)
      .then(gallery => setGallery(gallery.hits))
      // .finally(() => {
        setIsLoading(false);
      // });

  }, [page, searchText]);

  const fetchLoadMore = () => {
    getGallery(searchText, page)
      .then(gallery => {setGallery(prevGallery => [...prevGallery, ...gallery.hits]);
        setPage(prev => prev + 1);
      })
      // .catch(error => this.setState({ status: 'rejected' }));
  };

  const toggleModal = () => {
    setShowModal(!showModal )
  };

  const openModal = e => {
    setShowModal(true)
      setLargeImage(gallery[e].largeImageURL);
  };

  return (
    <>
      {isLoading && (
        <Audio
          className="true"
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )}
      <ul className={css.ImageGallery}>
        {gallery.map(({ id, webformatURL }, index) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            index={index}
            openModal={openModal}
          />
        ))}
      </ul>
      {gallery.length >= 12 && <Button onClick={fetchLoadMore} />}

      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
    </>
  );
}

// export default ImageGallery;