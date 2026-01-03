import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

// Import your components here
import Home from '../components/Home';
import Login from '../components/Login';
import UserRegister from '../components/UserRegister';
import FoodPartnerRegister from '../components/FoodPartnerRegister';
import UserLogin from '../components/UserLogin';
import FoodPartnerLogin from '../components/FoodPartnerLogin';
import Hero from '../components/Hero';
import FoodPartnerProfile from '../components/FoodPartnerProfile';
import CreateFood from '../components/CreateFood';
import Saved from '../components/Saved';
import Userprofile from '../components/Userprofile';
import PartnerProfile from '../components/PartnerProfile';
import PartnerHero from '../components/PartnerHero';
// import FoodList from '../components/FoodList'; // Uncomment when created

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/foodpartner" element={<FoodPartnerLogin />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/register/foodpartner" element={<FoodPartnerRegister />} />
        {/* <Route path="/foods" element={<FoodList />} /> */}
        <Route path="/createfood" element={<CreateFood />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/foodpartner/:id" element={<FoodPartnerProfile />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/partnerprofile" element={<PartnerProfile />} />
        <Route path="/partnerhero" element={<PartnerHero />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;