import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Vehicle from './components/Vehicle'
import EditVehicle from './components/Vehicle/index-edit';
import Person from './components/Person';
import EditPerson from './components/Person/index-edit';
import Service from './components/Service';
import EditService from './components/Service/index-edit';
import Login from './components/Login';
import PublicRoutes from './components/PublicRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes />}>
          <Route path='/' element={<Layout />}>
            <Route path= '/' element={<Navigate to="home"/>} />
            <Route path="home" element={<Home />} />
            <Route path="vehicle" element={<Vehicle />} />
            <Route path="vehicle/:id" element={<EditVehicle />} />
            <Route path="person" element={<Person />} />
            <Route path="person/:id" element={<EditPerson />} />
            <Route path="service" element={<Service />} />
            <Route path="service/:id" element={<EditService />} />
          </Route>
        </Route>
        <Route path='login' element={<PublicRoutes />}>
          <Route path='/login' element={<Login />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
