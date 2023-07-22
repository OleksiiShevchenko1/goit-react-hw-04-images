import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImagesAPI from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    query: '',
    loading: false,
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
    // this.setState({ loading: true });

    try {
      const { data } = await ImagesAPI.getImages(this.state.query);

      console.log(data);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));

      console.log(data);
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
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
