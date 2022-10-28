import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';


export function Searchbar({ onSubmit }) {
    const [searchData, setSearchData] = useState('');

    const handleDataChange = event => {
        setSearchData(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchData.trim() === '') {
            toast.warn('Введите данные для загрузки')
            return;
        }

        onSubmit(searchData);
        setSearchData('');
    }

    return (
          <header className={css.Searchbar} >
              <form className={css.SearchForm} onSubmit={handleSubmit}>
                  <button type="submit" className={css.SearchFormButton}>
                      <ImSearch />
                  </button>

                  <input
                      className={css.SearchFormInput}
                      type="text"
                      name="searchData"
                      value={searchData}
                      onChange={handleDataChange}
                      autoComplete="off"
                      autoFocus
                      placeholder="Search images and photos"
                  />
              </form>
          </header>
      );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}