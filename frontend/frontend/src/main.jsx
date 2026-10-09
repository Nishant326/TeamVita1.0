import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import Navbar from "./landing_page/NavBar.jsx";
import HomePage from "./landing_page/home/HomePage.jsx";
import About from "./landing_page/about/About.jsx";
import NoticePage from "./landing_page/notice/NoticePage.jsx";
import ResultMain from "./landing_page/study_materials/StudyMaterial.jsx";
import MainTopper from "./landing_page/topper/MainTopper.jsx";
import Footer from "./landing_page/Footer.jsx";
import Syllabus from "./landing_page/syllabus/Syllaus.jsx";
import LoginPage from "./component/LoginPage.jsx";
import ActivationPage from "./component/ActivationPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./landing_page/Profile.jsx";
import Notes from "./landing_page/study_materials/Notes.jsx";
import Pyq from "./landing_page/study_materials/Pyq.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ToastContainer />
    <Routes>

      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/activate" element={<ActivationPage />} />

      {/* ---------- PROTECTED LAYOUT ---------- */}
      <Route
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <Outlet />
              <Footer />
            </>
          </PrivateRoute>
        }
      >
        {/* Default redirect after login */}
        <Route index element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/study_materials" element={<ResultMain />} />
        <Route path="/topper" element={<MainTopper />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/syllabus/:branchName" element={<Syllabus />} />
        <Route path="/notes/:branchName/:semester" element={<Notes />} />
        <Route path="/pyq/:branchName/:semester" element={<Pyq />} />
      </Route>

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  </BrowserRouter>
);
