import React from 'react';
// import style from './Footer.module.scss';

const Footer = () => (
  <div className="relative bottom-0 mt-auto flex justify-center bg-slate-300">
    <p className=" p-2 text-sm text-slate-500">Copyright © 2022</p>
  </div>
);

export default React.memo(Footer, () => true);
