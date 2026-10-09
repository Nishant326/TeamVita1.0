import AdminDashboard from "./components/AdminDashboard"
import { Routes, Route, Navigate } from "react-router-dom";
import CreateNotice from "./components/Menu/CreateNotice";
import AdminLayout from "./components/AdminLayout";
import CreateNotes from "./components/Menu/CreateNotes";
import CreateTopper from "./components/Menu/CreateTopper";
import CreateSyllabus from "./components/Menu/CreateSyllabus";
import CreatePYQ from "./components/Menu/CreatePyq";

function App() {

  return (
    <>
     <Routes>
      {/* All admin pages use the same layout */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} /> {/* Default page */}
        <Route path="create-notice" element={<CreateNotice />} />
        <Route path="create-notes" element={<CreateNotes />} />
        <Route path="create-pyq" element={<CreatePYQ />} />
        
        <Route path="create-topper" element={<CreateTopper/>}/>
        <Route path="create-syllabus" element={<CreateSyllabus/>}/>
        
        {/* Redirect any unknown path to dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
    </>
  )
}
export default App;
