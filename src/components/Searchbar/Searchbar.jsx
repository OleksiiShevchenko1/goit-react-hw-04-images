import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  Styledbar,
  SearchForm,
  Searchbutton,
  Searchinput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputStr, setInputStr] = useState('');

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(inputStr);
  };

  const handleOnChange = ev => setInputStr(ev.target.value);

  return (
    <Styledbar>
      <SearchForm>
        <Searchbutton type="submit" onClick={handleSubmit}>
          <span>
            <FaSearch />
          </span>
        </Searchbutton>

        <Searchinput
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleOnChange}
        />
      </SearchForm>
    </Styledbar>
  );
};

// export class Searchbar extends Component {
//   state = {
//     inputStr: '',
//   };

//   handleSubmit = ev => {
//     ev.preventDefault();
//     this.props.onSubmit(this.state.inputStr);
//   };

//   handleOnChange = ev => {
//     this.setState({ inputStr: ev.target.value });
//   };

//   render() {
//     return (
//       <Styledbar>
//         <SearchForm>
//           <Searchbutton type="submit" onClick={this.handleSubmit}>
//             <span>
//               <FaSearch />
//               Search
//             </span>
//           </Searchbutton>

//           <Searchinput
//             className="input"
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleOnChange}
//           />
//         </SearchForm>
//       </Styledbar>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
