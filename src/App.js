import { useState, useEffect } from 'react'
import Menu from './components/Menu'
import TopBar from './components/TopBar'
import Dropdown from './components/Dropdown'
import Options from './components/Options'
import GridHeader from './components/GridHeader'
import Items from './components/Items'
import AddItem from './components/AddItem'
import EditOptions from './components/EditOptions'
import Sort from './components/Sort'
import Filter from './components/Filter'
import RecentOrders from './components/RecentOrders'
import ShippedOrders from './components/ShippedOrders'
import OrdersOptions from './components/OrdersOptions'
import OrderSearch from './components/OrderSearch'

const App = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [showEditItems, setShowEditItems] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [showFilterSelection, setShowFilterSelection] = useState(false)
  const [showInventory, setShowInventory] = useState(true)
  const [showOrders, setShowOrders] = useState(false)

  const [items, setItems] = useState([])
  const [showItems, setShowItems] = useState(items.slice())
  const [itemCount, setItemCount] = useState(0)

  const [orders, setOrders] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [shippedOrders, setShippedOrders] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const itemsFromServer = await fetchItems()
      const ordersFromServer = await fetchOrders()
      setItems(itemsFromServer)
      setOrders(ordersFromServer)
      setShowItems(itemsFromServer)

      getRecentAndShippedOrders(ordersFromServer)
    }

    getItems()
  }, [])


  const getRecentAndShippedOrders = (orders) => {
    const refDate = new Date("2022-02-21")
    var recent = []
    var shipped = []

    for (let order of orders) {
      if (new Date(order.date) >= refDate) {
        recent.push(order)
      } else {
        shipped.push(order)
      }
    }

    setRecentOrders(recent)
    setShippedOrders(shipped)
  }

  // Fetch items
  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/items')
    const data = await res.json()

    setItemCount(data.length)

    return data
  }

  // Fetch orders
  const fetchOrders = async () => {
    const res = await fetch('http://localhost:5000/orders')
    const data = await res.json()

    return data
  }

  const addItem = async (item) => {
    const res = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })

    const data = await res.json()

    setItems([...items, data])
    setShowItems([...items, data])

    const inventory = await fetchItems()
    setItemCount(inventory.length)
  }

  const searchItem = async (query) => {
    const itemsList = items.slice()
    var matchingItems = []
    for (const i of itemsList) {
      if (String(i.code).includes(query) ||
        i.name.toLowerCase().includes(query) ||
        i.department.toLowerCase().includes(query)) 
      {
        matchingItems.push(i)
      }
    }
    const getItems = await fetchItems()
    setItems(query != '' ? matchingItems : getItems)
    setShowItems(query != '' ? matchingItems : getItems)
  }

  const sortItems = async (sortBy) => {
    var getItems = await fetchItems()
    switch (sortBy) {
      case 'name-a-z':
        getItems.sort((a,b) => a.name < b.name ? -1 : 1)
        break
      case 'name-z-a':
        getItems.sort((a,b) => a.name > b.name ? -1 : 1)
        break
      case 'dept-a-z':
        getItems.sort((a,b) => a.department < b.department ? -1 : 1)
        break
      case 'dept-z-a':
        getItems.sort((a,b) => a.department > b.department ? -1 : 1)
        break
      case 'price-lo':
        getItems.sort((a,b) => a.price < b.price ? -1 : 1)
        break
      case 'price-hi':
        getItems.sort((a,b) => a.price > b.price ? -1 : 1)
        break
      case 'qty-lo':
        getItems.sort((a,b) => a.quantity < b.quantity ? -1 : 1)
        break
      case 'qty-hi':
        getItems.sort((a,b) => a.quantity > b.quantity ? -1 : 1)
        break
    }
    setItems(getItems)
    setShowItems(getItems)
  }

  const filterItem = async (filter) => {
    if (filter.submitType === 'Reset') {
      const serverItems = await fetchItems()
      setShowItems(serverItems)
      setShowFilterSelection(!showFilterSelection)
      return
    }

    var filteredItems = []
    var itemsList = items.slice()
    
    filteredItems = itemsList.filter((item) => {
      const withinPriceRange = item.price >= filter.priceRange[0] && item.price <= filter.priceRange[1]
      const withinQuantityRange = item.quantity >= filter.itemQuantity[0] && item.quantity <= filter.itemQuantity[1]
      
      return (
        (filter.department != '' ? item.department == filter.department : true)
        && (filter.priceRange ? withinPriceRange :  true)
        && (filter.itemQuantity ? withinQuantityRange : true)
      )
    })
    setItems(filteredItems)
    setShowItems(filteredItems)
  }

  const editItems = async () => {
    for (let item of items) {
      if (item.selected) {
        await fetch(`http://localhost:5000/items/${item.id}`, {
          method: 'DELETE'
        })
      }
    }
    var editedItems = items.slice()
    editedItems = editedItems.filter((item) => item.selected == false)
    setItems(editedItems)
    setShowItems(editedItems)
    const inventory = await fetchItems()
    setItemCount(inventory.length)
  }

  const fetchItem = async (id) => {
    const res = await fetch(`http://localhost:5000/items/${id}`)
    const data = await res.json()

    return data
  }

  const updateSelected = async (item) => {
    const itemToEdit = await fetchItem(item.id)
    const updatedItem = {...itemToEdit, selected: item.isChecked}
    const res = await fetch(`http://localhost:5000/items/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
    const data = await res.json()
    var newItems = items.slice()
    newItems[item.index] = data
    setItems(newItems)
    setShowItems(newItems)
  }

  const whenSelectAll = async (checked) => {
    var changedItems = []
    for (let item of items) {
      changedItems.push(item.id)
      const updatedItem = {...item, selected: checked}
      await fetch(`http://localhost:5000/items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
      })
    }
    const newItems = await fetchItems()
    setItems(newItems.filter((item) => changedItems.includes(item.id)))
    setShowItems(newItems.filter((item) => changedItems.includes(item.id)))
  }

  return (
    <div className="App">
      <Menu 
        items={items} 
        itemCount={itemCount} 
        toggleInventory={() => {
          if (showOrders && !showInventory) {
            setShowOrders(!setShowOrders)
            setShowInventory(!showInventory)
          }
        }}
        toggleOrders={() => {
          if (showInventory && !showOrders) {
            setShowInventory(!showInventory)
            setShowOrders(!showOrders)}
          }
        }
        />
      <TopBar onToggle={() => setShowDropdown(!showDropdown)}/>
      {showDropdown && <Dropdown />}
      {showInventory && 
        <div className='inventory'>
          <Options 
            onAdd={() => setShowAddItem(!showAddItem)}
            onEdit={() => setShowEditItems(!showEditItems)}
            onSort={() => setShowSort(!showSort)}
            onFilter={() => setShowFilter(!showFilter)}
            onSearch={searchItem}
          />
          {showAddItem && <AddItem onAdd={addItem} />}
          {showEditItems && <EditOptions onEdit={editItems} selectAll={whenSelectAll} />}
          {showSort && <Sort onSort={sortItems} />}
          {showFilter && <Filter onSelect={filterItem} />}
          <GridHeader />
          <div className='items-pane'>
            <Items 
              items={showItems} 
              showEdit={showEditItems}
              selected={updateSelected}
            />
          </div>
        </div>
      }
      {showOrders && 
        <div className='orders'>
          <OrdersOptions />
          <OrderSearch />
          <div className='recent-orders'><h2>Recent orders</h2></div>
          <RecentOrders 
            orders={recentOrders}
          />
          <div className='shipped-orders'><h2>Shipped orders</h2></div>
          <ShippedOrders 
            orders={shippedOrders}
          />
        </div>
      }
    </div>
  );
}

export default App;
