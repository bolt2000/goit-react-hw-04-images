import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import FormSearch from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

export function App() {
  const [searchText, setSearchText] = useState('');
  // const [page, setPage] = useState(1);

  // const nextPage = () => {
  //   setPage(( page + 1 ));
  // };
  

  const handleSearch = searchText => {
    setSearchText(searchText);
  };

  return (
    <div className={css.App}>
      <FormSearch onSubmit={handleSearch} />

      <ImageGallery
        searchText={searchText}
        // nextPage={nextPage}
        // page={page}
      />

      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default App;
