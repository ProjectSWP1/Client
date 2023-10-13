import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Register from "./components/Register/SignUp.js";
import Login from "./components/Login/SignIn.js";
import Admin from "./pages/AdminPage.js";
import Staff from "./pages/StaffPage.js";
import Trainer from "./pages/TrainerPage.js";
import ManageAccount from "./components/Admin/ManageAccount/ManageAccount";
import VerifyEmail from "./components/Register/VerifyEmail";
import Dash from "./components/Admin/Dashboard/Dash";
import UserProfile from "./components/User/UserProfile";
import { AuthProvider } from "./components/auth/auth";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import ZooArea from "./components/Staff/ZooArea/Zooarea";
import AnimalCage from "./components/Trainer/AnimalCage/AnimalCage";

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
          <Route path="/staff" element={<Staff />}>
            <Route exact path="zooarea" element={<ZooArea />} />
          </Route>
          <Route path="/trainer" element={<Trainer />}>
            <Route exact path="cages" element={<AnimalCage />} />
          </Route>
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
