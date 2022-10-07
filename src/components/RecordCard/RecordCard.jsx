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

  const calcCost: Number = RecordedProducts.reduce((total, recordedProduct) => {
    const { historyCost, amount, sendBack, Product } = recordedProduct;
    return Number(
      total + calSubTotal(amount, sendBack, Product?.unit, historyCost),
    );
  }, 0);

  const calcRevenue: Number = RecordedProducts.reduce(
    (total, recordedProduct) => {
      const { historyPrice, amount, sendBack, Product } = recordedProduct;
      return Number(
        total + calSubTotal(amount, sendBack, Product?.unit, historyPrice),
      );
    },
    0,
  );

  return (
    <Link to={`/record/${id}`}>
      <div className="grid grid-cols-5 border-b-2">
        <Item item={dayjs(date).format('MM/DD (dd)')} />
        <Item item={Location.name} />
        <Item item={calcCost} />
        <Item item={calcRevenue} />
        <Item item={calcRevenue - calcCost || 0} />
      </div>
    </Link>
  );
};

export default React.memo(RecordCard);
