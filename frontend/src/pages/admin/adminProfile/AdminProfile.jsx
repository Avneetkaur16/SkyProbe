import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminprofile.css';

const AdminProfile = () => {
  const admin_id = useParams();
  const [admin, setAdmin] = useState({});
  console.log(admin_id.admin_id)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async() => {
        try {
            const { data } = await axios.get(`/admin/profile/${admin_id?.admin_id}`);
            setAdmin(data);
        } catch(error) {
            console.log(error);
        }
    }
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.setItem("admin", null);
    navigate('/admin/login');
  }

  console.log(admin);

  return (
    <div className='admin-profile-main'>
      <div className='admin-profile-nav'>
        <h2>Admin Dashboard</h2>
        <small onClick={handleLogout}>Logout</small>
      </div>
      <div className='admin-profile-user'>
          <h3>{admin?.firstName} {admin?.lastName}</h3>
          <p>@{admin?.username}</p>
          <p>{admin?.email}</p>
      </div>
      <div className='admin-profile-operations'>
          <div className='admin-profile-op' onClick={() => navigate('/admin/flight/new')}>Create Flight Page</div>
          <div className='admin-profile-op' onClick={() => navigate('/admin/flight/all')}>View All Flights Page</div>
          <div className='admin-profile-op' onClick={() => navigate('/admin/all')}>View All Admins Page</div>
          <div className='admin-profile-op' onClick={() => navigate('/admin/register')}>Create a new admin Page</div>
      </div>
    </div>
  )
}

export default AdminProfile