import React from 'react';
import { Navigate, useMatch, useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import { toastHelper } from '../../helpers/swalHelper';

const ProtectedRoute = (props) => {
  const isMatch = useMatch('/admin/*');
  const navigate = useNavigate();
  const { children } = props;

  const { user } = useStore((state) => {
    return {
      user: state.user,
    };
  }, shallow);

  if (!user) {
    toastHelper('請先登入帳號!', 'warning', { position: 'top' });
    return (
      <Navigate
        to={`/user/login?redirect_url=${encodeURIComponent(
          window.location.pathname,
        )}`}
        replace
      />
    );
  }
  if (!user.isAdmin && isMatch) {
    return navigate(-1);
  }

  return children;
};

export default React.memo(ProtectedRoute);
