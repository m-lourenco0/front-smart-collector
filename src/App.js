import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Vehicle from './components/Vehicle'
import EditVehicle from './components/Vehicle/index-edit';
import Person from './components/Person';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="vehicle" element={<Vehicle />} />
          <Route path="person" element={<Person />} />
          <Route path="vehicle/:id" element={<EditVehicle />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
