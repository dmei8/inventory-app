import { useState } from 'react'
import search from '../img/search.png'
import filter from '../img/filter.png'

const OrderSearch = ({ onOrderSort, onOrderFilter }) => {
    const [query, setQuery] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='order-search-options'>
            <form className='order-search-form' onSubmit={onSubmit}>
                <input 
                    className='order-search-bar'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <input className='order-search-img' type='image' src={search}></input>
            </form>
            <ul className='order-edit-options'>
                <li onClick={onOrderSort}><h4>Sort by</h4></li>
                <li onClick={onOrderFilter}>
                    <img className='filter' src={filter}></img>
                    <h4>Filter</h4>
                </li>
            </ul>
        </div>
    )
}

export default OrderSearch