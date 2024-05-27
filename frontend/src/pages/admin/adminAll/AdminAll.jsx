import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminall.css';
import axios from 'axios';

const AdminAll = () => {
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get('/admin/all');
        setAdmins(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchAdmins();

  }, []);

  console.log(admins);

  return (
    <div className='admins-main'>
      <div className='admins-header'>
        <h1>SkyProbe All Admins</h1>
        <h4>Logged in as {admin?.username}</h4>
      </div>
      <div className='admins-container'>
        {admins ? admins?.map((adm) => (
          <div className='admins-admin' onClick={() => navigate(`/admin/profile/${adm?._id}`)}>
            <img src='https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg' alt='adminProfile' />
            <h4>{adm?.firstName} {adm?.lastName}</h4>
          </div>
        )) : (<p>Loading...</p>)}
      </div>
    </div>
  )
}

export default AdminAll