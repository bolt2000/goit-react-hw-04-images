import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.clickEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickEsc);
  }

  clickEsc = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = e => {
    e.target === e.currentTarget && this.props.toggleModal();
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>
    );
  }
}
