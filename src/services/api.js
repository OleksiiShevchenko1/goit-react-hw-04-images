import axios from 'axios';

const getImages = query => {
  return axios.get(
    `https://pixabay.com/api/?q=${query}&page=1&key=38326937-a464cd765301aaa81cc195e49&image_type=photo&orientation=horizontal&per_page=12`
  );
};

const ImagesAPI = {
  getImages,
};
export default ImagesAPI;
