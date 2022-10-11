import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import shallow from 'zustand/shallow';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import useStore from '../../../store';
import NAVITEMS from './NavItems.json';
import style from './Admin.module.scss';

const Admin = () => {
  const { user, onLogout } = useStore((state) => {
    return {
      user: state.user,
      onLogout: state.onLogout,
    };
  }, shallow);

  return (
    <div className="h-screen bg-[url('/src/assets/images/home.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto flex h-full flex-col p-2">
        <header className="container h-[14%]">
          <Header user={user} onLogout={onLogout} />
        </header>
        <section className="container my-auto flex h-[80%] flex-col bg-slate-100 shadow-lg">
          <div className={style.nav}>
            {NAVITEMS.map((item) => {
              return (
                <NavLink
                  to={item.url}
                  className="mx-1 mt-2 p-2"
                  key={item.name}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
          <div className="mx-2 mb-2 h-[86%] rounded-md bg-gradient-to-br from-[#f6d365] to-[#f1704c] p-2 shadow-md">
            <Outlet />
          </div>
        </section>
        <footer className="container h-[6%]">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default React.memo(Admin);
