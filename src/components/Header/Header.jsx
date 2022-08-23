import React from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItems.json';
// import style from './Header.module.scss';

const Header = () => (
  <div className="p-5 flex justify-between bg-sky-300 shadow-lg rounded-md">
    <h1>記帳簿</h1>
    <nav className="mt-auto">
      {NavItem.map((item) => (
        <Link
          key={item.name}
          to={item.url}
          className="text-blue-500 underline px-2"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  </div>
);

export default React.memo(Header);
