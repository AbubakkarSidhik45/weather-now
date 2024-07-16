import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./AppStyles.css";
import WeatherForm from "./components/WeatherForm";
import CitiesList from "./components/CitiesList";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<WeatherForm />} />
            <Route path="/plan-trip" element={<CitiesList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
