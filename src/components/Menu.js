import setting from '../img/setting.png';

const Menu = ({ itemCount, toggleInventory, toggleOrders }) => {


    return (
      <div className='menu-left'>
        <div className="logo"></div>
        <h1 className="title">Cleanventory</h1>
        <ul>
          <li onClick={toggleInventory}>Inventory</li>
          <li onClick={toggleOrders}>Orders</li>
        </ul>
        <img className='settings' src={setting}></img>
        <hr></hr>
        <div className='item-stats'>
          <h1 className='item-stat'>{itemCount}</h1>
          <h3 className='menu-text'>Items</h3>
          <h1 className='item-stat'>23</h1>
          <h3 className='menu-text'>Pending orders</h3>
          <h1 className='item-stat'>40</h1>
          <h3 className='menu-text'>Shipped orders</h3>
        </div>
      </div>
    )
  };
  
  export default Menu;