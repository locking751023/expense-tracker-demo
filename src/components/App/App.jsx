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
import ProtectRoute from '../../containers/ProtectedRoute';

// TODO 登入狀態無法進入login、register 頁面
// TODO 修改 calSubTotal 計算公式

const App = () => {
  const init = useStore((state) => state.init);
  useEffect(() => {
    init();
  }, []); // eslint-disable-line

  return (
    <Router>
      <Routes>
        <Route path="user" element={<User />}>
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
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There is nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
