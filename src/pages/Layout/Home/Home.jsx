import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const Home = () => {
  return (
    // className="flex h-full flex-col items-center justify-center bg-opacity-50 bg-[url('/src/assets/images/login.jpg')] bg-cover bg-center bg-no-repeat"
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
