import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import Record from '../Record';
import Footer from '../Footer';

const App = () => (
  <Router>
    <div className="container mx-auto flex h-full flex-col">
      {/* header */}
      <header className="container">
        <Routes>
          <Route path="/*" element={<Header />} />
        </Routes>
      </header>
      {/* body */}
      <section className="container mb-1 flex max-h-[83%] grow shadow-lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="record" element={<Record />} />
        </Routes>
      </section>
      {/* footer */}
      <footer className="container">
        <Routes>
          <Route path="/*" element={<Footer />} />
        </Routes>
      </footer>
    </div>
  </Router>
);

export default App;
