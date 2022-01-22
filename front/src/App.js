import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'antd/dist/antd.css'; 
import  Home  from './Components/Home'
import  Product  from './Components/Product'

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/:idProduct" element={<Product />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
