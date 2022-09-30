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
        <Route path="/" element={<Home />}>
          <Route path="records" element={<Records />} />
          <Route path="record/new" element={<NewRecord />} />
          <Route path="record/:rid" element={<Record />} />
          <Route path="record/:rid/edit" element={<EditRecord />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
