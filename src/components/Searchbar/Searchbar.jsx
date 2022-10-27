import { useState } from 'react';
//import { Component } from 'react'
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

import css from './Searchbar.module.css';


export function Searchbar({onSubmit}) {
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
          <header className={css.Searchbar} onSubmit={handleSubmit}>
              <form className={css.SearchForm}>
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



/*export class Searchbar extends Component {
    state = {
        searchData: ''
    }

    handleDataChange = event => {
        this.setState({ searchData: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.searchData.trim() === '') {
            toast.warn('Введите данные для загрузки')
            return;
        }

        this.props.onSubmit(this.state.searchData);
        this.setState({ searchData: '' });
    }

  render() {
      return (
          <header className={css.Searchbar} onSubmit={this.handleSubmit}>
              <form className={css.SearchForm}>
                  <button type="submit" className={css.SearchFormButton}>
                      <ImSearch />
                  </button>

                  <input
                      className={css.SearchFormInput}
                      type="text"
                      name="searchData"
                      value={this.state.searchData}
                      onChange={this.handleDataChange}
                      autoComplete="off"
                      autoFocus
                      placeholder="Search images and photos"
                  />
              </form>
          </header>
      );
    }
};*/
