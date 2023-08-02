import { Component } from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ev => {
    if (ev.key === 'Escape' || ev.target === ev.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <StyledOverlay onClick={this.handleKeyDown}>
        <StyledModal>
          <img src={this.props.poster} alt="pic" />
        </StyledModal>
      </StyledOverlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  poster: PropTypes.string,
};
