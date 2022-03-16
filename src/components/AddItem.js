import { useState } from 'react';

const AddItem = ({ onAdd }) => {
    const [code, setCode] = useState('')
    const [name, setItemName] = useState('')
    const [department, setDepartment] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!code) {
            alert('Please provide an item code')
            return
        } else if (!name) {
            alert('Please enter an item name')
            return
        } else if (!department) {
            alert('Please select a department')
            return
        } else if (!price) {
            alert('Please enter a price')
            return
        } else if (!quantity) {
            alert('Please enter an item quantity')
            return
        }

        if (code)

        onAdd({ code, name, department, price, quantity })

        setCode('')
        setItemName('')
        setDepartment('')
        setPrice('')
        setQuantity('')
    }

    return (
        <form className='add-item' onSubmit={onSubmit}>
            <div className='form-control add-item-code'>
                <label>Code</label>
                <input
                    type='text'
                    value={code}
                    onInput={(e) => {
                        var pattern = /^[1-9]\d*$/
                        var value = pattern.test(e.target.value) ? e.target.value.slice(0,-1) : e.target.value
                        setCode(value)
                    }}
                />
            </div>
            <div className='form-control add-item-name'>
                <label>Item</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setItemName(e.target.value)}
                />
            </div>
            <div className='form-control add-item-dept'>
                <label>Department</label>
                <input
                    type='text'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
            </div>
            <div className='form-control add-item-price'>
                <label>Price</label>
                <input
                    type='number'
                    step='0.01'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className='form-control add-item-qty'>
                <label>Quantity</label>
                <input
                    type='number'
                    pattern='[0-9]'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <input className='btn btn-block' type='submit' value='Add Item' />
        </form>
  )
};

export default AddItem;
