import React from 'react';

const Item = ({ item }) => (
  <div className="px-auto my-auto break-words py-2 text-center">{item}</div>
);

export default React.memo(Item);
