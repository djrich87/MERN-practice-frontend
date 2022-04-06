// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter as Router } from 'react-router-dom'

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>
// );




import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)