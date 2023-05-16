import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import FormSearch from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    showModal: false,
    largeImage: null,
    searchText: '',
    page: 1,
  };

  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSearch = searchText => {
    this.setState({ searchText, page: 1 });
  };

  render() {
    return (
      <div className={css.App}>
        <FormSearch onSubmit={this.handleSearch} />

        <ImageGallery
          searchText={this.state.searchText}
          nextPage={this.nextPage}
          page={this.state.page}
        />

        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

export default App;
