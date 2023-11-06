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
import ZooTrainer from "./components/Staff/ZooTrainer/Zootrainer";
import Animal from "./components/Trainer/Animal/Animal";
import AnimalSpecies from "./components/Trainer/AnimalSpecies/AnimalSpecies";
import TrainerProfile from "./components/Trainer/Profile/TrainerProfile";
import TrainerSchedule from "./components/Trainer/TrainerSchedule/TrainerSchedule";
import ManageEmployee from "./components/Admin/ManageEmployee/ManageEmployee";
import BuyTicket from "./pages/BuyTicket.js";
import StripePayment from "./stripepayment/StripePayment.jsx";
import TicketLayout from "./components/Ticket/TicketLayout.js";
import FeedingSchedule from "./components/Trainer/WorkAssignTrainer/FeedingSchedule.js";
import PostNews from "./components/Home/News/News.js";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/buy-ticket" element={<TicketLayout />} />
        <Route path="/payment" element={<StripePayment />} />

        <Route path="/admin" element={<Admin />}>
          <Route exact path="dashboard" element={<Dash />} />
          <Route path="manage-account" element={<ManageAccount />} />
          <Route path="manage-employee" element={<ManageEmployee />} />
        </Route>
        <Route path="/staff" element={<Staff />}>
          <Route exact path="zooarea" element={<ZooArea />} />
          <Route path="trainers" element={<ZooTrainer />} />
          <Route path="post-news" element={<PostNews />}></Route>
        </Route>
        <Route path="/trainer" element={<Trainer />}>
          <Route exact path="cages" element={<AnimalCage />} />
          <Route exact path="animals" element={<Animal />} />
          <Route exact path="animalspecies" element={<AnimalSpecies />} />
          <Route exact path="profile" element={<TrainerProfile />} />
          <Route exact path="schedule" element={<TrainerSchedule />} />
          <Route exact path="feeding-schedule" element={<FeedingSchedule />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
