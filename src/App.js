import React from "react";
import Cards from "./components/Cards";
import Header from "./components/Header"
import {Routes, Route} from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Detail from "./components/Detail";
import Reviews from "./components/Reviews";
function App() {
  return (
    <div className="App relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/review" element={<Reviews />} />
        
      </Routes>
    </div>
  );
}

export default App;
