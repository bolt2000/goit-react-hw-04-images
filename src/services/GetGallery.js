const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '20083016-0123a23ef68f74321fe951c35';
const PER_PAGE = 12;

export const getGallery = (searchText, page = 1) => {
  return fetch(
    `${BASE_URL}/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  ).then(res => res.json());
};
