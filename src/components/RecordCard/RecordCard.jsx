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
  const { id, RecordedProducts, date, Location } = props.record;
  const { getRecord } = props;

  const calcCost: Number = RecordedProducts.reduce((total, recordedProduct) => {
    return Number(
      total +
        recordedProduct.historyCost *
          (recordedProduct.amount - recordedProduct.sendBack),
    );
  }, 0);
  const calcRevenue: Number = RecordedProducts.reduce(
    (total, recordedProduct) => {
      return Number(
        total +
          recordedProduct.historyPrice *
            (recordedProduct.amount - recordedProduct.sendBack),
      );
    },
    0,
  );

  return (
    <Link to={`/record/${id}`} onClick={() => getRecord(id)}>
      <div className="grid grid-cols-5 gap-1 border-b-2">
        <Item item={dayjs(date).format('YYYY/MM/DD(dd)')} />
        <Item item={Location.name} />
        <Item item={calcCost} />
        <Item item={calcRevenue} />
        <Item item={calcRevenue - calcCost || ''} />
      </div>
    </Link>
  );
};

export default React.memo(RecordCard);
