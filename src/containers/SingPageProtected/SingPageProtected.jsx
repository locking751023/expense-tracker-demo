import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../../store';

const SingPageProtected = (props) => {
  const { children } = props;
  const { user } = useStore((state) => {
    return {
      user: state.user,
    };
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default React.memo(SingPageProtected);
