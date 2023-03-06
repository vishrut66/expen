import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, Register, Error, ProtectedRoute } from "./page/index";
import { AddExpense, AllExpense, Profile, Stats, SharedLayout } from "./page/dashboard/index.js"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>} >
          <Route index element={<Stats />} />
          <Route path='all-expense' element={<AllExpense />} />
          <Route path='add-expense' element={<AddExpense />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/landing" element={<LandingPage />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;

