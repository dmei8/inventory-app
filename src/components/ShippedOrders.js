import ShippedOrder from "./ShippedOrder";

const ShippedOrders = ({ orders }) => {
  return (
    <>
        {orders.map((order, index) => (
            <ShippedOrder
                key={index}
                order={order}
                index={index}
            />
        ))}
    </>
  )
};

export default ShippedOrders;