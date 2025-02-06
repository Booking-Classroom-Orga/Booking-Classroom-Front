import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <Router>
      <nav>
        {/* TO DELETE LATER */}
        <Link to="/">login</Link>
        <Link to="/signup">Signup</Link>
        {/* --------------- */}
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
