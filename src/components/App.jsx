import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dna } from  'react-loader-spinner'

import { SectionApp } from './SectionApp/SectionApp';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import FetchImages from '../services/fetch-api';

export class App extends Component {
  state = {
    searchData: '',
    images: [],
    totalHits: 0,
    imagesOnPage: 0,
    page: 1,
    loading: false,
    showModal: false,
    currentLargeImageUrl: '',
  };


  componentDidUpdate(prevProps, prevState) {
    const nextQuery = this.state.searchData;
    const prevQuery = prevState.searchData;
    const nextPage = this.state.page;

    if (nextQuery !== prevQuery) {

      this.setState({ loading: true });
  
      FetchImages(nextQuery, nextPage)
        .then(({ hits, totalHits }) => {

          if (hits.lenght === 0) {
            this.setState({ images: [], imagesOnPage: 0, totalHits: 0 });
            return Promise.reject(
              new Error(`There is no image with name ${nextQuery}`)
            );
          }

          const arrayOfImages = this.createArrayOfImages(hits);

          this.setState({
            images: arrayOfImages,
            totalHits,
            imagesOnPage: hits.length,
          })
        })
        .finally(()=> this.turnOffLoader());
    };


    if (this.state.page > prevState.page) {

      this.setState({ loading: true });
  
      FetchImages(nextQuery, nextPage)
        .then(({ hits }) => {

          const arrayOfImages = this.createArrayOfImages(hits);

          this.setState(prevState => {
            return { images: [...prevState.images, ...arrayOfImages] };
          });

          this.setState({
            imagesOnPage: this.state.images.length,
          });
        })
        .finally(() => this.turnOffLoader());
    };
  };

  createArrayOfImages = data => {
    const arrayOfImages = data.map(element => ({
      id: element.id,
      webformatURL: element.webformatURL,
      largeImageURL: element.largeImageURL,
    }));
    return arrayOfImages;
  };


  handleFormSubmit = searchData => {
    this.setState({ searchData, page:1 });
  }

  nextFetch = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  turnOffLoader = () => {
    return this.setState({ loading: false });
  };

  openModal = event => {
    const currentLargeImageUrl = event.target.src;
    console.log(currentLargeImageUrl);

    this.setState({ currentLargeImageUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalHits,
      loading,
      showModal,
      currentLargeImageUrl,
    } = this.state;

    return (
      <SectionApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        <Dna
          visible={loading}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        {imagesOnPage >= 12 && imagesOnPage < totalHits && (
          <ButtonMore
            onClick={this.nextFetch}
          />
        )}
        {showModal && <Modal
          onCloses={this.toggleModal}
          imageUrl={currentLargeImageUrl}
        />}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          draggable
        />
      </SectionApp>
    );
  }
}