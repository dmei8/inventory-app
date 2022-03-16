import { useState } from 'react';
import search from '../img/search.png';
import add from '../img/add.png';
import filter from '../img/filter.png';

const Options = ({ onAdd, onEdit, onSort, onFilter, onSearch }) => {
  const [query, setQuery] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onSearch(query)
  }

  return (
    <div className='options'>
      <ul>
        <li className='option-add' onClick={onAdd}>
          <img className='add-img' src={add}></img>
          <h4 className='add-text'>Add</h4>
        </li>
        <li className='option-edit' onClick={onEdit}>
          <h4>Edit</h4>
        </li>
        <li onClick={onSort}><h4>Sort by</h4></li>
        <li onClick={onFilter}>
          <img className='filter' src={filter}></img>
          <h4>Filter</h4>
        </li>
        <li>
          <form className='search-form' onSubmit={onSubmit}>
            <input 
              className='search-bar'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <input className='search-img' type='image' src={search}></input>
          </form>
        </li>
      </ul>
    </div>
  ) 
};

export default Options;
