import React from 'react';

const Footer = () => (
  <div className="flex h-full w-full justify-center rounded-b-md bg-slate-300">
    <p className="flex items-center text-sm text-slate-500">Copyright © 2022</p>
  </div>
);

export default React.memo(Footer, () => true);
