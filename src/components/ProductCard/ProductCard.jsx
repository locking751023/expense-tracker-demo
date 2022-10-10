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
  const [subTotal, setSubTotal] = React.useState();

  React.useEffect(() => {
    setSubTotal(() => {
      return (
        calSubTotal(historyPrice, amount, Product.unit) -
        calSubTotal(historyPrice, sendBack, Product.unit)
      );
    });
  }, [historyPrice, amount, sendBack, Product.unit]);

  return (
    <div className="grid grid-cols-6 gap-1 border-b-2">
      <Item item={Product.name} />
      <Item item={historyPrice} />
      <Item item={Product.unit} />
      <Item item={amount} />
      <Item item={sendBack} />
      <Item item={subTotal} />
    </div>
  );
};

export default React.memo(ProductCard);
