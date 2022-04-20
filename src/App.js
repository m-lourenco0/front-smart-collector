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
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';


function App() {


  return (
    <>
      <Routes>
        {/* Rotas públicas */}
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/login' element={<Login />}/>

        {/* Rotas privadas*/}
        <Route element={<RequireAuth allowedRoles={[1000, 2000, 3000]}/>}>
          <Route path='/' element={<Layout />} >
            <Route path='/' element={<Navigate to="home"/>} />
            <Route path="home" element={<Home />} />
            <Route path="service" element={<Service />} />
            <Route path="service/:id" element={<EditService />} />

              {/* Rotas privadas - usuário comum */}
            <Route element={<RequireAuth allowedRoles={[2000, 3000]}/>}>
              <Route path="vehicle" element={<Vehicle />} />
              <Route path="vehicle/:id" element={<EditVehicle />} />
              <Route path="person" element={<Person />} />
            </Route>

              {/* Rotas privadas - usuário administrador */}
            <Route element={<RequireAuth allowedRoles={[3000]}/>}>
              <Route path="person/:id" element={<EditPerson />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
