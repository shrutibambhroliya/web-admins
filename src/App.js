import React, { useState, useEffect } from "react";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import CategoryList from "./Components/CategoryList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/Login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
