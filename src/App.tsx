import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { SidebarProvider } from "./components/ui/sidebar";
import ListClassroom from "./pages/classroom/ListClassroom";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/list-classrooms" element={<ListClassroom />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
