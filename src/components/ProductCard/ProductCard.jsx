import React from 'react';
import Item from '../Item';
import { calSubTotal } from '../../helpers/calcHelper';

type ProductCardProps = {
  product: {
    historyPrice: Number,
    unit: String,
    amount: Number,
    sendBack: Number,
  },
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { historyPrice, Product, amount, sendBack } = props.product;

  return (
    <div className="grid grid-cols-6 gap-1 border-b-2">
      <Item item={Product.name} />
      <Item item={historyPrice} />
      <Item item={Product.unit} />
      <Item item={amount} />
      <Item item={sendBack} />
      <Item item={calSubTotal(amount, Product.unit, historyPrice)} />
    </div>
  );
};

export default React.memo(ProductCard);
