import axios from 'axios';
const API_KEY = '38326937-a464cd765301aaa81cc195e49';

export const serviceApi = (page, query) => {
  return axios(
    `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}&q=${query}}`
  );
};
//  перенес в папку SRC
