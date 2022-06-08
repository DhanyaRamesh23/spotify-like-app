import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AddSongPage from "./pages/AddSongPage";
import { DataContextProvider } from "./contexts/DataContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import LogoutPage from "./pages/LogoutPage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App container ">
      <Router>
        <DataContextProvider>
          <Header />
          <Routes className="container">
            <Route element={<HomePage />} path="/" exact />
            <Route element={<AddSongPage />} path="/add-song" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<LogoutPage />} path="/logout" />
            <Route element={<RegisterPage />} path="/register" />
          </Routes>
        </DataContextProvider>
      </Router>
    </div>
  );
}

export default App;
