import Item from "./Item";

const Items = ({ items, showEdit, selected }) => {
  return (
    <>
        {items.map((item, index) => (
            <Item
                key={index}
                item={item}
                index={index}
                showEdit={showEdit}
                selected={selected}
            />
        ))}
    </>
  )
};

export default Items;
