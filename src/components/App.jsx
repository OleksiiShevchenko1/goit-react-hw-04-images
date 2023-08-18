import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './Imagegallery/Imagegallery';
import { serviceApi } from 'services/ServiceApi';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    isListShown: false,
    modalShown: null,
    error: '',
  };

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    )
      this.getImages();
  };

  getImages = () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });
    serviceApi(page, query)
      .then(results => {
        this.setState(prevState => ({
          images: [...prevState.images, ...results.data.hits],
          totalHits: results.data.totalHits,
        }));
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false, isListShown: true }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSubmit = query => {
    this.setState({ images: [], query, page: 1 });
  };

  openModal = largeImage => {
    this.setState({ modalShown: largeImage });
  };

  closeModal = () => {
    this.setState({ modalShown: null });
  };

  render() {
    const { images, isLoading, isListShown, modalShown, totalHits } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {images.length !== 0 && (
          <ImageGallery pictures={images} openModal={this.openModal} />
        )}
        {isListShown && !isLoading && images.length < totalHits && (
          <Button onLoad={this.onLoadMore} />
        )}
        {modalShown !== null && (
          <Modal poster={modalShown} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
