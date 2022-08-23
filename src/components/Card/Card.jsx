import React from 'react';
import Item from '../Item';
// import style from './Card.module.scss';

const Card = (props) => {
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

export default React.memo(Card);
