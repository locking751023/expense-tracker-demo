import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from '../../pages/Layout/User';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Home from '../../pages/Layout/Home';
import Records from '../../pages/Records';
import Record from '../../pages/Record';
import NewRecord from '../../pages/NewRecord';
import EditRecord from '../../pages/EditRecord';
import Admin from '../../pages/Layout/Admin';
import UserLists from '../../pages/UserLists/UserLists';
import useStore from '../../store';
import ProtectRoute from '../../containers/ProtectedRoute/ProtectedRoute';
import SingPageProtected from '../../containers/SingPageProtected/SingPageProtected';

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
    return (
      <div className="flex h-screen w-full justify-center">
        <div className="my-auto">載入中...</div>
      </div>
    );
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
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
          <Route
            path="profile"
            element={
              <div className="flex h-full w-full justify-center">
                <p className="my-auto text-5xl">施工中...</p>
              </div>
            }
          >
            <Route
              path="setting"
              element={
                <div className="flex h-full w-full justify-center">
                  <p className="my-auto text-5xl">施工中...</p>
                </div>
              }
            />
          </Route>
        </Route>
        <Route path="admin" element={<Admin />}>
          <Route index element={<UserLists />} />
          <Route path="user" element={<UserLists />} />
          <Route
            path="productList"
            element={<p className=" p-3 text-3xl">productList</p>}
          />
          <Route
            path="locationList"
            element={<p className=" p-3 text-3xl">locationList</p>}
          />
          <Route
            path="allRecords"
            element={<p className=" p-3 text-3xl">allRecords</p>}
          />
        </Route>
        <Route
          path="*"
          element={
            <main className="p-4">
              <p>找不到頁面!!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
