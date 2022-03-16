const ShippedOrder = ({ order, index }) => {

    return (
      <div className='order-grid'>
          {/* <div className='order-num'><h4>{order.num}</h4></div> */}
          <div className='order-item-code'><h4>{order.itemCode}</h4></div>
          <div className='order-item'><h4>{order.item}</h4></div>
          <div className='order-units'><h4>{order.units}</h4></div>
          <div className='order-total'><h4>{order.total}</h4></div>
          <div className='order-unit-price'><h4>{order.unitPrice}</h4></div>
          <div className='order-image'></div>
      </div>
    )
    };
    
    export default ShippedOrder;