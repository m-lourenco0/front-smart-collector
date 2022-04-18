import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Vehicle from './components/Vehicle'
import EditVehicle from './components/Vehicle/index-edit';
import Person from './components/Person';
import EditPerson from './components/Person/index-edit';
import Service from './components/Service';
import EditService from './components/Service/index-edit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="vehicle" element={<Vehicle />} />
          <Route path="vehicle/:id" element={<EditVehicle />} />
          <Route path="person" element={<Person />} />
          <Route path="person/:id" element={<EditPerson />} />
          <Route path="service" element={<Service />} />
          <Route path="service/:id" element={<EditService />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
