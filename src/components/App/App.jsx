import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from '../../pages/Layout/User';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Home from '../../pages/Layout/Home';
import Records from '../../pages/Records';
import Record from '../../pages/Record';
import NewRecord from '../../pages/NewRecord';
import EditRecord from '../../pages/EditRecord';

const App = () => (
  <Router>
    <Routes>
      <Route path="user" element={<User />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<Home />}>
        <Route path="record/new" element={<NewRecord />} />
        <Route path="record/:rid" element={<Record />} />
        <Route path="record/:rid/edit" element={<EditRecord />} />
        <Route path="records" element={<Records />} />
      </Route>
    </Routes>
    {/*
      <div className="container mx-auto flex h-full flex-col">
      <header className="container">
      <Header />
      </header>
      
      <section className="container mb-1 flex max-h-[83%] grow shadow-lg">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="record/:id" element={<Record />} />
      <Route path="record/new" element={<NewRecord />} />
      <Route path="record/:id/edit" element={<EditRecord />} />
      </Routes>
      </section>
      
      <footer className="container">
      <Footer />
      </footer>
      </div>
    */}
  </Router>
);

export default App;
