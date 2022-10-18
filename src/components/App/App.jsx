import { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import User from '../../pages/Layout/User';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Home from '../../pages/Layout/Home';
import Records from '../../pages/Records';
import Record from '../../pages/Record';
import NewRecord from '../../pages/NewRecord';
import EditRecord from '../../pages/EditRecord';
import Profile from '../../pages/Profile';
import Admin from '../../pages/Layout/Admin';
import UserLists from '../../pages/UserLists/UserLists';
import AllRecords from '../../pages/AllRecords/AllRecords';
import LocationLists from '../../pages/LocationLists/LocationLists';
import ProductLists from '../../pages/ProductLists/ProductLists';
import useStore from '../../store';
import ProtectRoute from '../../containers/ProtectedRoute/ProtectedRoute';
import SingPageProtected from '../../containers/SingPageProtected/SingPageProtected';
import { MySwal } from '../../helpers/swalHelper';

const App = () => {
  const { init, isAppInitializedComplete } = useStore((state) => {
    return {
      init: state.init,
      isAppInitializedComplete: state.isAppInitializedComplete,
    };
  });
  useEffect(() => {
    init();
  }, []); // eslint-disable-line

  if (!isAppInitializedComplete) {
    MySwal.fire({
      title: '應用程式初始化中...',
      timer: 500,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    return <div className="flex h-screen w-full justify-center" />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="user"
          element={
            <SingPageProtected>
              <User />
            </SingPageProtected>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        >
          <Route path="/" element={<Records />} />
          <Route path="record">
            <Route path="new" element={<NewRecord />} />
            <Route path=":rid" element={<Record />} />
            <Route path=":rid/edit" element={<EditRecord />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="admin"
          element={
            <ProtectRoute>
              <Admin />
            </ProtectRoute>
          }
        >
          <Route index element={<UserLists />} />
          <Route path="user" element={<UserLists />} />
          <Route path="productList" element={<ProductLists />} />
          <Route path="locationList" element={<LocationLists />} />
          <Route path="allRecords" element={<AllRecords />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
