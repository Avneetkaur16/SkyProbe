import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminallflights.css';

const AdminAllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async() => {
      try {
        const { data } = await axios.get('/flight/all');
        setFlights(data);

      } catch(error) {
        console.log(error);
      }
    }
    fetchFlights();
  }, []);

  console.log(flights);

  return (
    <div className='admin-flights-main'>
      <div className='admin-flights-header'>
        <h1>SkyProbe All Flights</h1>
        <h4>Logged in as @{admin?.username}</h4>
      </div>
      <div className='admin-flights-container'>
        {flights ? flights?.map((flight) => (
          <div className='admin-flights-flight' key={flight._id} onClick={() => navigate(`/admin/flight/${flight._id}`)}>
            <div className='admin-flights-flight-logo'>
              <h4>{flight?.flightNumber}</h4>
              <h4>{flight?.airline}</h4>
              <img src={flight?.airlineLogo} alt='airlineLogo' />
            </div>
            <div className='admin-flights-flight-info'>
              <h4>Origin:</h4>
              <p>{flight?.origin?.airport}</p>
            </div>
            <div className='admin-flights-flight-info'>
              <h4>Destination:</h4>
              <p>{flight?.destination?.airport}</p>
            </div>
          </div>
        )) : (<p>Loading...</p>)}
      </div>
    </div>
  )
}

export default AdminAllFlights