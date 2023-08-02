import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
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
    console.log(ev.currentTarget);
    console.log(ev.target);
  };
  render() {
    return createPortal(
      <div class="overlay" onClick={this.handleKeyDown}>
        <div class="modal">
          <img
            src={this.props.data.largeImage}
            alt="pic"
            width="800"
            height="800"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
