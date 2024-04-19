import './App.css';

import "./assets/fonts/Barlow-SemiBold.ttf";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Website/Home/home";
import Barra from "./components/ui/navBar/barra";
import Acerca from "./pages/Website/Acerca/acerca";
import Contacto from "./pages/Website/Contacto/contacto";
import Trial from "./pages/Website/Trial/trial";
import React from 'react';
import ResponsiveAppBar from "./components/ui/ResponsiveAppBar/responsiveAppBar";

function App() {
  return (
      <>
          <div className="App">
              <Barra/>
              {/*<ResponsiveAppBar/>*/}
          </div>
          <div className="content">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path={"/acerca"} element={<Acerca />}/>
                  <Route path={"/contacto"} element={<Contacto />}/>
                  <Route path={"/trial"} element={<Trial />}/>
              </Routes>
          </div>
      </>

  );
}


export default App;

//https://colorhunt.co/palette/2c3333395b64a5c9cae7f6f2
