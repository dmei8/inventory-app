const Item = ({ item, index, showEdit, selected }) => {

  return (
    <div className='item-grid'
      style={{backgroundColor: `${index % 2 === 0 ? 'white' : '#F4F9FF'}`}}
    >
        <div className='item-code'><h4>{item.code}</h4></div>
        <div className='item-name'><h4>{item.name}</h4></div>
        <div className='item-dept'><h4>{item.department}</h4></div>
        <div className='item-price'><h4>${`${String(item.price).padEnd(4,'0')}`}</h4></div>
        <div className='item-qty'><h4>{item.quantity}</h4></div>
        {showEdit && 
          <input
            type='checkbox'
            checked={item.selected}
            onChange={(e) => {
              let isChecked = e.target.checked
              let id = item.id
              selected({isChecked, id, index})
            }}
          />
        }
    </div>
  )
  };
  
  export default Item;
  