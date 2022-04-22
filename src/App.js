import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Pages/Layout';
import Home from './components/Pages/Home';
import Vehicle from './components/Pages/Vehicle'
import EditVehicle from './components/Pages/Vehicle/index-edit';
import Person from './components/Pages/Person';
import EditPerson from './components/Pages/Person/index-edit';
import Service from './components/Pages/Service';
import EditService from './components/Pages/Service/index-edit';
import Login from './components/Pages/Login';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import AddSolicitation from './components/Pages/AddSolicitation';
import CreateRoute from './components/Pages/CreateRoute';
import SolicitationList from './components/Pages/SolicitationList';


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
            <Route path="solicitation" element={<SolicitationList />} />

            {/* Rotas privadas - usuário comum */}
            <Route element={<RequireAuth allowedRoles={[2000, 3000]}/>}>
              <Route path="vehicle" element={<Vehicle />} />
              <Route path="vehicle/:id" element={<EditVehicle />} />
              <Route path="person" element={<Person />} />
              <Route path="service/new" element={<CreateRoute />} />
            </Route>

            {/* Rotas privadas - usuário administrador */}
            <Route element={<RequireAuth allowedRoles={[3000]}/>}>
              <Route path="person/:id" element={<EditPerson />} />
            </Route>
            
            {/* Rotas privadas - cliente */}
            <Route element={<RequireAuth allowedRoles={[1000]}/>}>
              <Route path="new-service" element={<AddSolicitation />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
