import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './adminedit.css';

const AdminEdit = () => {
  const admin_id = useParams();
  const [admin, setAdmin] = useState({});
  const [password, setPassword] = useState('');
  
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
  }, [admin_id?.admin_id]);

  console.log(admin)

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/admin/edit/${admin_id.admin_id}`, admin);
      console.log(data);
      navigate(`/admin/profile/${admin_id.admin_id}`);

    } catch(error) {
      console.log(error);
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/admin/edit/${admin_id.admin_id}`, { ...admin, password: password });
      console.log(data);
      navigate(`/admin/profile/${admin_id.admin_id}`);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='admin-profile-edit-main'>
      <div className='admin-profile-edit-header'>
        <h1>SkyProbe Admin Profile</h1>
        <h2>{admin?.firstName} {admin?.lastName}</h2>
        <p>@{admin?.username}</p>
      </div>
      <div className='admin-profile-edit-container'>
        <form>
          <div className='admin-edit-form-field'>
            <label>Username</label>
            <input type='text' value={admin?.username} onChange={(e) => setAdmin({ ...admin, username: e.target.value })} />
          </div>

          <div className='admin-edit-form-field'>
            <label>First Name</label>
            <input type='text' value={admin?.firstName} onChange={(e) => setAdmin({ ...admin, firstName: e.target.value })} />
          </div>

          <div className='admin-edit-form-field'>
            <label>Last Name</label>
            <input type='text' value={admin?.lastName} onChange={(e) => setAdmin({ ...admin, lastName: e.target.value })} />
          </div>

          <div className='admin-edit-form-field'>
            <label>E-mail</label>
            <input type='email' value={admin?.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
          </div>

          <button onClick={handleUpdate}>Save Changes</button>
        </form>
        <br />
        <form>
          <div className='admin-edit-form-field'>
            <label>Change Password</label>
            <input type='password' value={password} min={8} max={16} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleUpdatePassword}>Update Password</button>
        </form>
      </div>
    </div>
  )
}

export default AdminEdit