import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { SidebarProvider } from "./components/ui/sidebar";
import ListClassroom from "./pages/classroom/ListClassroom";
import SingleClassroom from "./pages/classroom/SingleClassroom";
import ListUser from "./pages/user/ListUser";
import SingleUser from "./pages/user/SingleUser";
import CommonDashboard from "./pages/CommonDashboard";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CommonDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/list-classrooms" element={<ListClassroom />} />
          <Route path="/classroom/:id" element={<SingleClassroom />} />
          <Route path="/list-users" element={<ListUser />} />
          <Route path="/user/:id" element={<SingleUser />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
