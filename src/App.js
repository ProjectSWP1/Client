import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Register from "./components/Register/SignUp.js";
import Login from "./components/Login/SignIn.js";
import Admin from "./pages/AdminPage.js";
import ManageAccount from "./components/Admin/ManageAccount/ManageAccount";
import VerifyEmail from "./components/Register/VerifyEmail";
import Dash from "./components/Admin/Dashboard/Dash";
import UserProfile from "./components/User/UserProfile";
import { AuthProvider } from "./components/auth/auth";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/resetpassword" element={<ResetPassword/>}/>
          <Route path="/admin" element={<Admin />}>
            <Route exact path="dashboard" element={<Dash />} />
            <Route path="manageaccount" element={<ManageAccount />} />
          </Route>
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
