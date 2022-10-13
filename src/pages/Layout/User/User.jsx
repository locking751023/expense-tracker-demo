import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/Footer';

const User = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[url('/src/assets/images/login.jpg')] bg-cover bg-center bg-no-repeat">
      <Outlet />
      <div className="my-auto mb-0 h-[5%] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default React.memo(User);
