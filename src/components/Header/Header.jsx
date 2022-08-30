import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavItem from './NavItems.json';
import style from './Header.module.scss';

const Header = () => (
  <div className={style.root}>
    <div className="flex justify-between rounded-md bg-sky-300 p-5 shadow-lg">
      <h1>記帳簿</h1>
      <nav className="mt-auto">
        {NavItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.url}
            className="rounded-t-lg border-b border-sky-500 px-4 py-2 text-blue-500 hover:border"
          >
            {item.name}
          </NavLink>
        ))}
        <button className="btn ml-3 bg-success text-white hover:shadow-md">
          <Link to="logout">登出</Link>
        </button>
      </nav>
    </div>
  </div>
);

export default React.memo(Header);
