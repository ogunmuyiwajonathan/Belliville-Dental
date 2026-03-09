import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProfessionalEducation from './pages/ProfessionalEducation';
import PatientEducation from './pages/PatientEducation';
import Research from './pages/Research';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';
import Book from './pages/Book';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/professional-education" element={<ProfessionalEducation />} />
          <Route path="/patient-education" element={<PatientEducation />} />
          <Route path="/research" element={<Research />} />
          <Route path="/products" element={<Products />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/book" element={<Book />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;