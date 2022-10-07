import React from 'react';
import { Navigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useStore from '../../store';

const ProtectedRoute = (props) => {
  const { children } = props;

  const { user } = useStore((state) => {
    return {
      user: state.user,
    };
  }, shallow);

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
  return children;
};

export default React.memo(ProtectedRoute);
