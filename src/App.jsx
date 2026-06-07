import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./pages/Login.jsx";
import SignupComponent from "./pages/Signup.jsx";
import DashboardComponent from "./pages/Dashboard.jsx";
import { LoaderContextProvider } from "./context/LoaderContext.jsx";
import SubjectComponent from "./pages/Subjects.jsx";

function App() {
  return (
    <LoaderContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/subjects" element={<SubjectComponent />} />
        </Routes>
      </BrowserRouter>
    </LoaderContextProvider>
  );
}

export default App;
