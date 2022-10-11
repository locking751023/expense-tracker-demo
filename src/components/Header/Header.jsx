import React from 'react';
import { NavLink } from 'react-router-dom';
import NavItem from './NavItems.json';
import style from './Header.module.scss';

const Header = (props) => {
  const { user, onLogout } = props;
  return (
    <div className={style.root}>
      <div className={style.body} data-active={user?.isAdmin}>
        <h1 className="mb-2 sm:mb-0 sm:flex sm:flex-col sm:justify-center">
          {user?.isAdmin ? `${user?.name} 管理員` : `${user?.name} 記帳簿`}
        </h1>
        <nav className="mt-auto flex justify-end">
          {NavItem.map((item) => {
            if (user?.isAdmin || (!user?.isAdmin && !item.isAdmin)) {
              return (
                <NavLink
                  key={item.name}
                  to={item.url}
                  className="rounded-t-lg border-b border-sky-500 px-4 py-2 text-blue-500 hover:border data-active:border-black data-active:text-black"
                  data-active={user?.isAdmin}
                >
                  {item.name}
                </NavLink>
              );
            }
            return '';
          })}
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
