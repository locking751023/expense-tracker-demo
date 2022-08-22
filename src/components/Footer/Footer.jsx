import React from 'react';
// import style from './Footer.module.scss';

const Footer = () => (
  <div className="flex justify-center bg-slate-300 mt-auto relative bottom-0">
    <p className=" text-sm p-2 text-slate-500">Copyright © 2022</p>
  </div>
);

export default React.memo(Footer, () => true);
