import React from 'react'
import order from '../img/order.png'
import edit_order from '../img/edit_order.png'

const OrdersOptions = () => {
  return (
    <div className='orders-options'>
        <button id='order-btn'><img src={order}></img>Place an order</button>
        <button id='edit-order-btn'><img src={edit_order}></img>Manage orders</button>
    </div>
  )
}

export default OrdersOptions