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
import useStore from '../../store';
import ProtectRoute from '../../containers/ProtectedRoute/ProtectedRoute';
import SingPageProtected from '../../containers/SingPageProtected/SingPageProtected';

// TODO 修改 calSubTotal 計算公式

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
      <div className="flex h-full w-full justify-center">
        <div className="my-auto">載入中...</div>
      </div>
    );
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
          <Route
            path="/report"
            element={
              <div className="flex h-full w-full justify-center">
                <p className="my-auto text-5xl">施工中...</p>
              </div>
            }
          />
          <Route
            path="/setting"
            element={
              <div className="flex h-full w-full justify-center">
                <p className="my-auto text-5xl">施工中...</p>
              </div>
            }
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
