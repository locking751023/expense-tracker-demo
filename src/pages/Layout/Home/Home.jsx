import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import useStore from '../../../store';

const Home = () => {
  const user = useStore((state) => state.user);

  if (!user) {
    return (
      <Navigate
        to={`/user/login?redirect_url=${encodeURIComponent(
          window.location.pathname,
        )}`}
        replace
      />
    );
  }
  return (
    <div className="outline-r h-full bg-[url('/src/assets/images/home.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto flex h-full flex-col p-2">
        <header className="container h-[11%]">
          <Header />
        </header>
        <section className="container my-auto flex h-[83%] bg-slate-100 shadow-lg">
          <Outlet />
        </section>
        <footer className="container h-[6%]">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default React.memo(Home);
