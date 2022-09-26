import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import Record from '../Record';
import NewRecord from '../NewRecord';
import EditRecord from '../EditRecord';
import Footer from '../Footer';

const App = () => (
  <Router>
    <div className="container mx-auto flex h-full flex-col">
      {/* header */}
      <header className="container">
        <Header />
      </header>
      {/* body */}
      <section className="container mb-1 flex max-h-[83%] grow shadow-lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="record/:id" element={<Record />} />
          <Route path="record/new" element={<NewRecord />} />
          <Route path="record/:id/edit" element={<EditRecord />} />
        </Routes>
      </section>
      {/* footer */}
      <footer className="container">
        <Footer />
      </footer>
    </div>
  </Router>
);

export default App;
