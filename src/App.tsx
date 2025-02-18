import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import { SidebarProvider } from './components/ui/sidebar';
import ListClassroom from './pages/classroom/ListClassroom';
import SingleClassroom from './pages/classroom/SingleClassroom';
import ListUser from './pages/user/ListUser';
import SingleUser from './pages/user/SingleUser';
import CommonDashboard from './pages/CommonDashboard';
import UserNotConnected from './pages/UserNotConnected';
import PrivateRoute from './components/private-route/PrivateRoute';

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserNotConnected />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <CommonDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/list-classrooms"
            element={
              <PrivateRoute>
                <ListClassroom />
              </PrivateRoute>
            }
          />
          <Route
            path="/classroom/:id"
            element={
              <PrivateRoute>
                <SingleClassroom />
              </PrivateRoute>
            }
          />
          <Route
            path="/list-users"
            element={
              <PrivateRoute>
                <ListUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <SingleUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
