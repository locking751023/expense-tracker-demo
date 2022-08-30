import React from 'react';

type ItemProps = {
  item: String,
};

const Item: React.FC<ItemProps> = ({ item }) => (
  <div className="px-auto my-auto break-words py-2 text-center">{item}</div>
);

export default React.memo(Item, () => true);
