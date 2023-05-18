import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchProvider } from "./components/contexts/GlobalContexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
