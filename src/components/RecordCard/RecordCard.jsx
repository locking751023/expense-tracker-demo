import React from 'react';
import Item from '../Item';

type RecordCardProps = {
  cost: Number,
  revenue: Number,
  date: String,
  local: String,
};

const RecordCard: React.FC<RecordCardProps> = (props) => {
  const { cost, revenue, date, local } = props.record;
  return (
    <div className="grid grid-cols-5 gap-1 border-b-2">
      <Item item={date} />
      <Item item={local} />
      <Item item={cost} />
      <Item item={revenue} />
      <Item item={revenue - cost} />
    </div>
  );
};

export default React.memo(RecordCard);
