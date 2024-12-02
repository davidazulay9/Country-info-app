import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Countries from "../components/countries";
import CountriesDetails from "../components/countriesDetails";

function Rutas() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Countries />}/>
          <Route path="/details/:countryId" element={<CountriesDetails />}/>
        </Routes>
      </Router>
    </>
  );
}

export default Rutas;