import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
