import RecentOrder from "./RecentOrder";

const RecentOrders = ({ orders }) => {
  return (
    <>
        {orders.map((order, index) => (
            <RecentOrder
                key={index}
                order={order}
                index={index}
            />
        ))}
    </>
  )
};

export default RecentOrders;