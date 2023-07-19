import css from './Searchbar.module.css';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      console.log('Please enter name');
      return;
    }
    onSubmit(name);
    setName('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <BiSearchAlt size={28} />
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={name}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
