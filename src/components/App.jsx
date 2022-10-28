import { useState, useEffect } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dna } from  'react-loader-spinner'

import { SectionApp } from './SectionApp/SectionApp';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import fetchImages from '../services/fetch-api';


export const App = () => {
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentLargeImageUrl, setCurrentLargeImageUrl] = useState('');


  useEffect(() => {
    if (searchData !== '') {
      setLoading(true);

      fetchImages(searchData, page)
        .then(({ hits, totalHits }) => {
          if (hits.lenght === 0) {
            setImages([]);
            setTotalHits(0);
            return Promise.reject(
              new Error(`There is no image with name ${searchData}`)
            );
          };
          const arrayOfImages = createArrayOfImages(hits);
          setTotalHits(totalHits);
          return arrayOfImages;
          
        })
        .then(arrayOfImages => {
          if (page === 1) {
            setImages(arrayOfImages);
            return
          }
          setImages(prevImages => [...prevImages, ...arrayOfImages]);
        })
        .finally(() => turnOffLoader());
    }

  }, [page, searchData]);

  const createArrayOfImages = data => {
    const arrayOfImages = data.map(element => ({
      id: element.id,
      webformatURL: element.webformatURL,
      largeImageURL: element.largeImageURL,
    }));
    return arrayOfImages;
  };

  const handleFormSubmit = searchData => {
    //console.log(searchData);
    setSearchData(searchData);
    setPage(1);
  }

  const nextFetch = () => {
    setPage(prevPage => prevPage + 1);
  };

  const turnOffLoader = () => {
    return setLoading(false);
  };

  const openModal = event => {
    setCurrentLargeImageUrl(event.target.src);
    
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <SectionApp>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      <Dna
        visible={loading}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      {images && images.length >= 12 && images.length < totalHits && (
        <ButtonMore
          onClick={nextFetch}
        />
      )}
      {showModal && <Modal
        onCloses={toggleModal}
        imageUrl={currentLargeImageUrl}
      />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        draggable
      />
    </SectionApp>
  );
};