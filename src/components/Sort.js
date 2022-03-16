import { useState } from "react";

const Sort = ({ onSort }) => {
    const [sortValue, setSortValue] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        onSort(sortValue)
    }

    return (
        <form className='sort-dropdown' onSubmit={onSubmit}>
            <label htmlFor='sort'>Sort items by:</label>
            <select 
                id='sort' 
                value={sortValue} 
                onChange={(e) => setSortValue(e.target.value)}
            >
                <option value=''></option>
                <option value='name-a-z'>Alphabetical A-Z (Name)</option>
                <option value='name-z-a'>Alphabetical Z-A (Name)</option>
                <option value='dept-a-z'>Alphabetical A-Z (Department)</option>
                <option value='dept-z-a'>Alphabetical Z-A (Department)</option>
                <option value='price-lo'>Price: Low to High</option>
                <option value='price-hi'>Price: High to Low</option>
                <option value='qty-lo'>Quantity: Low to High</option>
                <option value='qty-hi'>Quantity: High to Low</option>
            </select>
            <input className='btn' type='submit' value='Sort' />
        </form>
    )
};

export default Sort;

