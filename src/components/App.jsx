import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImagesAPI from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { toast } from 'react-toastify';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

// 1) Выдать алерт что ошибка,  введите корректное имя
// 2) добавить кнопку load more , прописать логику что при ее нажатии рендериться еще 12 фоток плюс скролит  вниз.
// 3) добавить стили
// 4) добавить проп тайпс

export class App extends Component {
  state = {
    images: [],
    query: '',
    loading: false,
    error: '',
    modalShow: null,
    page: 1,
    totalHits: null,
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchGallery();
    }
  }

  fetchGallery = async () => {
    this.setState({ loading: true });

    try {
      const { data } = await ImagesAPI.getImages(this.state.query);

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      toast.warning('Sorry, server error!');
    } finally {
      this.setState({ loading: false });
    }
  };

  openModal = largeImage => {
    console.log(largeImage);
    this.setState({ modalShow: largeImage });
  };
  closeModal = () => {
    this.setState({ modalShow: null });
  };

  render() {
    console.log(this.state.modalShow);
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.loading ? (
          <Loader />
        ) : (
          <ImageGallery images={this.state.images} openModal={this.openModal} />
        )}
        {this.state.modalShow && (
          <Modal data={this.state.modalShow} onClose={this.closeModal} />
        )}
        <Button text="" />
      </div>
    );
  }
}

// componentDidMount() {
//   axios
//     .get(
//       'https://pixabay.com/api/?q=cat&page=1&key=38326937-a464cd765301aaa81cc195e49&image_type=photo&orientation=horizontal&per_page=12'
//     )
//     .then(res => this.setState({ images: res.data.hits }));
// }
