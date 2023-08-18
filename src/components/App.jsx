import { useCallback, useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './Imagegallery/Imagegallery';
import { serviceApi } from '../services/ServiceApi';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListShown, setIsListShown] = useState(false);
  const [modalShown, setModalShown] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getImages = useCallback(() => {
    setIsLoading(true);
    serviceApi(page, query)
      .then(results => {
        setImages(prevState => [...prevState, ...results.data.hits]);
        setTotalHits(results.data.totalHits);
      })
      .catch(error => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
        setIsListShown(true);
      });
  }, [page, query]);

  useEffect(() => {
    if (!query) {
      return;
    } else {
      getImages();
    }
  }, [query, getImages]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const openModal = largeImage => {
    setModalShown(largeImage);
  };

  const closeModal = () => {
    setModalShown(null);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery pictures={images} openModal={openModal} />
      )}
      {isListShown && !isLoading && images.length < totalHits && (
        <Button onLoad={onLoadMore} />
      )}
      {modalShown !== null && (
        <Modal poster={modalShown} onClose={closeModal} />
      )}
    </>
  );
};

// export class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     isListShown: false,
//     modalShown: null,
//     error: '',
//   };

//   componentDidUpdate = (_, prevState) => {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     )
//       this.getImages();
//   };

//   getImages = () => {
//     const { page, query } = this.state;
//     this.setState({ isLoading: true });
//     serviceApi(page, query)
//       .then(results => {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...results.data.hits],
//           totalHits: results.data.totalHits,
//         }));
//       })
//       .catch(error => this.setState({ error: error.message }))
//       .finally(() => this.setState({ isLoading: false, isListShown: true }));
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleSubmit = query => {
//     this.setState({ images: [], query, page: 1 });
//   };

//   openModal = largeImage => {
//     this.setState({ modalShown: largeImage });
//   };

//   closeModal = () => {
//     this.setState({ modalShown: null });
//   };

//   render() {
//     const { images, isLoading, isListShown, modalShown, totalHits } =
//       this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.handleSubmit} />
//         {isLoading && <Loader />}
//         {images.length !== 0 && (
//           <ImageGallery pictures={images} openModal={this.openModal} />
//         )}
//         {isListShown && !isLoading && images.length < totalHits && (
//           <Button onLoad={this.onLoadMore} />
//         )}
//         {modalShown !== null && (
//           <Modal poster={modalShown} onClose={this.closeModal} />
//         )}
//       </>
//     );
//   }
// }
