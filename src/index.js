import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import Home from "./pages/Home/ThirdPartyPackage.jsx";
import ThirdPartyPackage from "./pages/Home/third-party-package/ThirdPartyPackage";
import SecondPage from "./pages/Home/sbom-reports/SecondPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<ThirdPartyPackage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router> 
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
