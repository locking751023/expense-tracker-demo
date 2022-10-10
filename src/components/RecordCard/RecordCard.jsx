import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Item from '../Item';
import 'dayjs/locale/zh-tw';
import { calSubTotal } from '../../helpers/calcHelper';

dayjs.locale('zh-tw');

type RecordCardProps = {
  record: {
    id: Number,
    RecordedProducts: Object,
    date: String,
    Location: Object,
  },
};

const RecordCard: React.FC<RecordCardProps> = (props) => {
  const { id, RecordedProducts, date, Location } = props.record;
  const [ShippingSum, setShippingSum] = React.useState(0);
  const [StockSum, setStockSum] = React.useState(0);
  const [salesSum, setSalesSum] = React.useState(0);
  const [commission, setCommission] = React.useState(0);
  const [sumOfBusiness, setSumOfBusiness] = React.useState(0);

  React.useEffect(() => {
    setShippingSum(() => {
      return RecordedProducts.reduce((total, recordedProduct) => {
        const { historyPrice, amount, Product } = recordedProduct;
        return Number(total + calSubTotal(historyPrice, amount, Product?.unit));
      }, 0);
    });
    setStockSum(() => {
      const stockSun = RecordedProducts.reduce((total, recordedProduct) => {
        const { historyPrice, sendBack, Product } = recordedProduct;
        return Number(
          total + calSubTotal(historyPrice, sendBack, Product?.unit),
        );
      }, 0);
      if (stockSun === 0) return '0';
      return stockSun;
    });
    setSalesSum(ShippingSum - StockSum);
    setCommission(Math.round(salesSum * 0.16));
    setSumOfBusiness(salesSum - commission);
  }, [RecordedProducts, ShippingSum, StockSum, salesSum, commission]);

  return (
    <Link to={`/record/${id}`}>
      <div className="grid grid-cols-5 border-b-2">
        <Item item={dayjs(date).format('MM/DD (dd)')} />
        <Item item={Location.name} />
        <Item item={ShippingSum} subItem={StockSum} />
        <Item item={salesSum} subItem={commission} />
        <Item item={sumOfBusiness} />
      </div>
    </Link>
  );
};

export default React.memo(RecordCard);
