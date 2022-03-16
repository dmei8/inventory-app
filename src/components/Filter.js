import { useState } from "react";

const Filter = ({ onSelect }) => {
    const [department, setDepartment] = useState('')
    const [price, setPriceRange] = useState('')
    const [quantity, setQuantity] = useState('')
    const [submitType, setSubmitType] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if (submitType === 'Reset') {
            setDepartment('')
            setPriceRange('')
            setQuantity('')
        }
        console.log(price, quantity)
        var priceRange = price != '' ? price.split(',').map(x => parseInt(x)) : ''
        var itemQuantity = quantity != '' ? quantity.split(',').map(x => parseInt(x)) : ''
        onSelect({ department, priceRange, itemQuantity, submitType })
    }

    return (
        <form className='filter-dropdown' onSubmit={onSubmit}>
            <label htmlFor='department'>Department</label>
            <select 
                id='department' 
                value={department} 
                onChange={(e) => setDepartment(e.target.value)}
            >
                <option value=''></option>
                <option value='Office supplies'>Office supplies</option>
                <option value='Canned food'>Canned food</option>
                <option value='Personal hygiene'>Personal hygiene</option>
                <option value='Snacks'>Snacks</option>
            </select>
            <label htmlFor='price-range'>Price range</label>
            <select 
                id='price-range' 
                value={price} 
                onChange={(e) => setPriceRange(e.target.value)}
            >
                <option value=''></option>
                <option value={'0,2'}>$2 and below</option>
                <option value={'3,5'}>$3 - $5</option>
                <option value={'6,1000'}>$6 and above</option>
            </select>
            <label htmlFor='quantity'>Quantity</label>
            <select 
                id='quantity' 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
            >
                <option value=''></option>
                <option value={'0,20'}>20 and below</option>
                <option value={'21,100'}>21 - 100</option>
                <option value={'101,1000'}>101 and above</option>
            </select>
            <div className='filter-btns'>
                <input 
                    className='btn' 
                    type='submit' 
                    value='Filter'
                    onClick={(e) => setSubmitType(e.target.value)}>
                </input>
                <input 
                    className='btn btn-reset' 
                    type='submit' 
                    value='Reset'
                    onClick={(e) => setSubmitType(e.target.value)}>
                </input>
            </div>
        </form>
    )
};

export default Filter;
