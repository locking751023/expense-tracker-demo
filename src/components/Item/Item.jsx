import React from 'react';

const Item = ({ item, subItem }) => {
  return (
    <div className="px-auto my-auto flex flex-col justify-center py-2 text-center sm:flex-row">
      {subItem ? (
        <>
          <div className="break-words sm:px-1">{item}</div>
          <div className="break-words">/ {subItem}</div>
        </>
      ) : (
        <div className="break-words">{item}</div>
      )}
    </div>
  );
};

export default React.memo(Item);
