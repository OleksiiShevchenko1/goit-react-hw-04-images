import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  Styledbar,
  SearchForm,
  Searchbutton,
  Searchinput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputStr: '',
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit(this.state.inputStr);
  };

  handleOnChange = ev => {
    this.setState({ inputStr: ev.target.value });
  };

  render() {
    return (
      <Styledbar>
        <SearchForm>
          <Searchbutton type="submit" onClick={this.handleSubmit}>
            <span>
              <FaSearch />
              Search
            </span>
          </Searchbutton>

          <Searchinput
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleOnChange}
          />
        </SearchForm>
      </Styledbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
