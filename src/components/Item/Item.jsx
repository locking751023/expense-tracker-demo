import React from 'react';

const Item = ({ item, subItem }) => {
  return (
    <div className="px-auto my-auto break-words py-2 text-center">
      {subItem ? `${item} / ${subItem}` : `${item}`}
    </div>
  );
};

export default React.memo(Item);
