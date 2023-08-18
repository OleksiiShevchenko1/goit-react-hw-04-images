import { useCallback, useEffect } from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ poster, onClose }) => {
  const handleKeyDown = useCallback(
    ev => {
      if (ev.key === 'Escape' || ev.target === ev.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <StyledOverlay onClick={handleKeyDown}>
      <StyledModal>
        <img src={poster} alt="pic" />
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  poster: PropTypes.string,
};

// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = ev => {
//     if (ev.key === 'Escape' || ev.target === ev.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return (
//       <StyledOverlay onClick={this.handleKeyDown}>
//         <StyledModal>
//           <img src={this.props.poster} alt="pic" />
//         </StyledModal>
//       </StyledOverlay>
//     );
//   }
// }

// Modal.propTypes = {
//   onClose: PropTypes.func,
//   poster: PropTypes.string,
// };
