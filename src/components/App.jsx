import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';

import * as Api from './services/api';

import Notiflix from 'notiflix';

export const App = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(12);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    if (q === '') {
      return;
    }
    setIsLoading(true);
    getImage(q, page, perpage);
  }, [q, page, perpage]);

  const getImage = async (name, page, perpage) => {
    try {
      const images = await Api.getImages(name, page, perpage);
      if (!images.length) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query "${name}". Please try again.`
        );
      }
      setImages(prev => [...prev, ...images]);
    } catch (error) {
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  };
  const handleFormSubmit = name => {
    if (q === name) {
      Notiflix.Notify.info(
        `Your request "${name}" has already been completed! :-)`
      );
      return;
    }
    setImages([]);
    setQ(name);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalOpen = url => {
    setModalUrl(url);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && (
        <ImageGallery
          images={images}
          openModal={toggleModal}
          modalUrl={handleModalOpen}
        />
      )}

      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button loadMore={handleLoadMore} />}
      {showModal && (
        <Modal modalImg={modalUrl} onClose={toggleModal}>
          <img src={modalUrl} alt={images.tags} />
        </Modal>
      )}
    </div>
  );
};
