import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Item from '../Item';
import 'dayjs/locale/zh-tw';

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
  const { id, date, Location, shippingSum, stockSum } = props.record;
  const [salesSum, setSalesSum] = React.useState(0);
  const [commission, setCommission] = React.useState(0);
  const [sumOfBusiness, setSumOfBusiness] = React.useState(0);
  const RATIO = 0.16;

  React.useEffect(() => {
    setSalesSum(shippingSum - stockSum);
    setCommission(Math.round(salesSum * RATIO));
    setSumOfBusiness(salesSum - commission);
  }, [shippingSum, stockSum, salesSum, commission]);

  return (
    <Link to={`/record/${id}`}>
      <div className="grid grid-cols-5 border-b-2">
        <Item item={dayjs(date).format('MM / DD (dd)')} />
        <Item item={Location.name} />
        <Item item={shippingSum} subItem={stockSum} />
        <Item item={salesSum} subItem={commission} />
        <Item item={sumOfBusiness} />
      </div>
    </Link>
  );
};

export default React.memo(RecordCard);
