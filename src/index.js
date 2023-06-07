import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, SearchProvider, ToastProvider, UserProvider } from "./components/contexts/GlobalContexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <AuthProvider>
          <ToastProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </ToastProvider>
        </AuthProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
