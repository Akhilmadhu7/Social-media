
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
import UserProfilePage from './pages/User/UserProfilePage';
import EditProfile from './components/User/EditProfile';
import SearchUsers from './components/User/SearchUsers';
import SearchUsersPage from './pages/User/SearchUsersPage';
import EditProfilePage from './pages/User/EditProfilePage';
import FriendsSuggestio from './components/User/FriendsSuggestion';
import FriendsSuggestion from './components/User/FriendsSuggestion';
import FreindsSuggestPage from './pages/User/FreindsSuggestPage';
import FriendProfilePage from './pages/User/FriendProfilePage';
import PrivateRoutes from './Utils/PrivateRoutes';

function App() {
  return (
    <div className="App">
      

      <Router>
        <AuthProvider>
            <Routes>
              {/* <Route  element={<PrivateRoutes/>}> */}
                <Route element={<SignupPage/>} path='/signup' />
                <Route element={<LoginPage/>} path='/' />
                <Route element={<HomePage/>} path='/home' />
                <Route element={<UserProfilePage/>} path='/profile' />
                <Route element={<EditProfilePage/>} path='/editprofile' />
                <Route element={<SearchUsersPage/>} path='/searchuser/:search' />
                <Route element={<FreindsSuggestPage/>} path='/friends-suggestion' />
                <Route element={<FriendProfilePage/>} path='/friend-profile/:user_id' />
              {/* </Route> */}
            
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
