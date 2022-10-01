import { Navigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useStore from '../../store';

const ProtectedRoute = (props) => {
  const { children } = props;

  const { user, isAppInitializedComplete } = useStore((state) => {
    return {
      user: state.user,
      isAppInitializedComplete: state.isAppInitializedComplete,
    };
  }, shallow);

  if (!isAppInitializedComplete) {
    return <div className="my-spinner">Loading</div>;
  }
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

export default ProtectedRoute;
