import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Hero from "./components/hero/Hero";
import NavBar from "./components/header/Navbar";
import SideBar from "./components/header/SideBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/footer/Footer";
import Python from "./components/Python";
import Mathplotlib from "./components/Mathplotlib";
import Numpy from "./components/Numpy";
import Admin from "./components/Admin";
import AdminRoute from "./components/AdminRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <UserAuthContextProvider>
        <NavBar toggle={toggle} />
        <SideBar isOpen={isOpen} toggle={toggle} />
        <Routes>
          <Route
            path="/python"
            element={
              <ProtectedRoute>
                <Python />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mathplotlib"
            element={
              <ProtectedRoute>
                <Mathplotlib />
              </ProtectedRoute>
            }
          />
          <Route
            path="/numpy"
            element={
              <ProtectedRoute>
                <Numpy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
      <Footer />
    </>
  );
}

export default App;
