import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavItem from './NavItems.json';
import style from './Header.module.scss';

const Header = () => (
  <div className={style.root}>
    <div className="p-5 flex justify-between bg-sky-300 shadow-lg rounded-md">
      <h1>記帳簿</h1>
      <nav className="mt-auto">
        {NavItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.url}
            className="text-blue-500 px-4 py-2 border-b border-sky-500 rounded-t-lg hover:border"
          >
            {item.name}
          </NavLink>
        ))}
        <button className="btn ml-3 py-1 bg-emerald-500 text-white hover:shadow-lg">
          <Link to="logout">登出</Link>
        </button>
      </nav>
    </div>
  </div>
);

export default React.memo(Header);
