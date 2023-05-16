// import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Component } from 'react';
import { Audio } from 'react-loader-spinner';
import { getGallery } from 'services/GetGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Button from '../Button/Button';

class ImageGallery extends Component {
  state = {
    gallery: [],
    isLoading: false,
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log('Пропс:>>', this.props);
    const prevName = prevProps.searchText;
    const nextName = this.props.searchText;
    if (prevName !== nextName) {
      this.setState({ isLoading: true });
      this.fetchLoad();
    }

    if (prevProps.page !== this.props.page && this.props.page > 1) {
      this.fetchLoadMore();
    }
  }

  fetchLoad = () => {
    getGallery(this.props.searchText, this.props.page)
      .then(gallery => this.setState({ gallery: gallery.hits }))
      // .then(gallery => console.log('запрос:>>', gallery.hits))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  fetchLoadMore = () => {
    const { searchText, page } = this.props;

    getGallery(searchText, page)
      .then(gallery => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...gallery.hits],
        }));
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = e => {
    this.setState(({ gallery }) => ({
      showModal: true,
      largeImage: gallery[e].largeImageURL,
    }));
  };

  render() {
    const { showModal, gallery, isLoading, largeImage } = this.state;
    const { openModal, toggleModal } = this;
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
        {gallery.length >= 12 && <Button onClick={this.props.nextPage} />}

        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
      </>
    );
  }
}

export default ImageGallery;
