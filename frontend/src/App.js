import './App.css';
import Home from './pages/home/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Search from './pages/search/Search';
import Flight from './pages/flight/Flight';
import Checkout from './pages/checkout/Checkout';
import Payment from './pages/payment/Payment';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import User from './pages/user/User';
import Booking from './pages/booking/Booking';
import AdminRegister from './pages/admin/adminRegister/AdminRegister';
import AdminLogin from './pages/admin/adminLogin/AdminLogin';
import AdminProfile from './pages/admin/adminProfile/AdminProfile';
import AdminCreateFlight from './pages/admin/adminCreateFlight/AdminCreateFlight';
import AdminFlightPage from './pages/admin/adminFlightPage/AdminFlightPage';
import AdminEditFlight from './pages/admin/adminEditFlight/AdminEditFlight';
import AdminEdit from './pages/admin/adminEdit/AdminEdit';
import AdminAllFlights from './pages/admin/adminAllFlights/AdminAllFlights';
import AdminAll from './pages/admin/adminAll/AdminAll';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/flight/:flight_id' element={<Flight />} />
        <Route path='/checkout/:flight_id' element={<Checkout />} />
        <Route path='/payment/:flight_id' element={<Payment />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/:user_id' element={<User />} />
        <Route path='/booking/:booking_id/:user_id/:flight_id' element={<Booking />} />
        <Route path='/admin/register' element={<AdminRegister />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/profile/:admin_id' element={<AdminProfile />} />
        <Route path='/admin/flight/new' element={<AdminCreateFlight />} />
        <Route path='/admin/flight/:flight_id' element={<AdminFlightPage />} />
        <Route path='/admin/flight/edit/:flight_id' element={<AdminEditFlight />} />
        <Route path='/admin/profile/:admin_id/edit' element={<AdminEdit />} />
        <Route path='/admin/flight/all' element={<AdminAllFlights />} />
        <Route path='/admin/all' element={<AdminAll />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
