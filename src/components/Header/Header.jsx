import React from 'react';
import { NavLink } from 'react-router-dom';
import NavItem from './NavItems.json';
import style from './Header.module.scss';

const Header = (props) => {
  const { user, onLogout } = props;

  return (
    <div className={style.root}>
      <div className="flex h-full flex-col justify-between rounded-t-md bg-sky-300 p-5 shadow-lg sm:flex-row">
        <h1 className="mb-2 sm:mb-0 sm:flex sm:flex-col sm:justify-center">
          {user.name} 記帳簿
        </h1>
        <nav className="mt-auto flex justify-end">
          {NavItem.map((item) => (
            <NavLink
              key={item.name}
              to={item.url}
              className="rounded-t-lg border-b border-sky-500 px-4 py-2 text-blue-500 hover:border"
            >
              {item.name}
            </NavLink>
          ))}
          <button
            className="btn ml-3 bg-success text-white"
            onClick={() => onLogout()}
          >
            登出
          </button>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(Header, () => true);
