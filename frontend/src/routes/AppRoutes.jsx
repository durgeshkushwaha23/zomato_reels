import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import { Home } from "../pages/general/Home";
import CreateFoodPartner from "../pages/food-partner/CreateFoodPartner";

const Approutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/foodpartner/register"
            element={<FoodPartnerRegister />}
          />
          <Route
            path="/food-partner/register"
            element={<FoodPartnerRegister />}
          />
          <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-food" element={<CreateFoodPartner />} />

        </Routes>
      </Router>
    </div>
  );
};  

export default Approutes;
