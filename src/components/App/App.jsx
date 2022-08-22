import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const App = () => (
  <Router>
    <div className="container mx-auto flex flex-col min-h-full">
      {/* header */}
      <header className="container">
        <Routes>
          <Route path="/" element={<Header />} />
        </Routes>
      </header>
      {/* body */}
      <section className="container flex grow" />
      {/* footer */}
      <footer className="container">
        <Routes>
          <Route path="/" element={<Footer />} />
        </Routes>
      </footer>
    </div>
  </Router>
);

export default App;
