import React from 'react';

type ItemProps = {
  item: String,
};

const Item: React.FC<ItemProps> = ({ item }) => (
  <div className="py-2 px-auto my-auto text-center break-words">{item}</div>
);

export default React.memo(Item, () => true);
