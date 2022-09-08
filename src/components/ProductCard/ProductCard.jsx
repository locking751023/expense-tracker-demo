import React from 'react';
import Item from '../Item';

type ProductCardProps = {
  name: String,
  price: Number,
  unit: String,
  count: Number,
  sendBack: Number,
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { name, price, unit, count, sendBack } = props.product;
  return (
    <div className="grid grid-cols-6 gap-1 border-b-2">
      <Item item={name} />
      <Item item={price} />
      <Item item={unit} />
      <Item item={count} />
      <Item item={sendBack} />
      <Item item={price * (count - sendBack)} />
    </div>
  );
};

export default React.memo(ProductCard);
