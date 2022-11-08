
import './App.css';

import SignupPage from './pages/User/SignupPage';
import LoginPage from './pages/User/LoginPage';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {AuthProvider} from './context/UserAuthContext'

import HomePage from './pages/User/HomePage';
import { AuthAdminProvider } from './context/AdminAuthContext';
import AdminLogin from './components/Admin/AdminLogin';
// import Dashboard from './components/Admin/Dashboard';
import Sidebar from './components/Admin/Sidebar';
import AdminLayout from './components/Admin/AdminLayout';
import DashboardPage from './pages/Admin/DashboardPage';
import UserListPage from './pages/Admin/UserListPage';

function App() {
  return (
    <div className="App">

      <Router>
        <AuthProvider>
            <Routes>
              <Route element={<SignupPage/>} path='/signup' />
              <Route element={<LoginPage/>} path='/' />
              <Route element={<HomePage/>} path='/home' />
            
            </Routes>
        </AuthProvider>  

        <AuthAdminProvider>
          <Routes>
            <Route element={<AdminLogin/>} path='/adminlogin' />
            <Route element={<AdminLayout></AdminLayout>} path='/admin/' >
                <Route element={<DashboardPage/>} path='/admin/dashboard' />
                <Route element={<UserListPage/>} path='/admin/userlist' />
            </Route>    
          </Routes>
        </AuthAdminProvider>  

      </Router>

      
     
    </div>
  );
}

export default App;
