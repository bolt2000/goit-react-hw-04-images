import { Component } from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';
// import { ToastContainer, toast } from 'react-toastify';

class FormSearch extends Component {
  state = {
    searchText: '',
  };

  handleChange = e => {
    this.setState({ searchText: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchText.trim() === '') {
      // toast.warning('Enter data in the search field!');
      return alert('Enter word search');
    }

    this.props.onSubmit(this.state.searchText);
    this.setState({ searchText: '' });
  };

  reset = () => {
    this.setState({ searchText: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            value={this.state.searchText}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

FormSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormSearch;
