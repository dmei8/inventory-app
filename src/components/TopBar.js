import menu from '../img/menu.png';

const TopBar = ({onToggle}) => {
  return (
    <div className='top-bar'>
        <img className='menu-img' src={menu} onClick={onToggle}></img>
        <div className='profile-pic'></div>
        <h3 className='admin-welcome'>Hello, Admin</h3>
    </div>
  )
};

export default TopBar;
