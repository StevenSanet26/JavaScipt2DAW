import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
//import Home from './Components/Home';


import Header from './Components/Header';
import Footer from './Components/Footer';
import Register from './Components/Register';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Productos from './Components/Productos';
/*
import Productos from './Components/Productos';
import AreaPersonal from './Components/AreaPersonal';
import Registrarse from './Components/Registrarse';
import Login from './Components/Login';

import Home from './Components/Home';
    <Route path="/productos" element={<Productos />} />
          <Route path="/areapersonal" element={<AreaPersonal />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
*/

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Routes>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Logout" element={<Logout/>}/>
          <Route path="/Productos" element={<Productos/>}/>
        </Routes>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
