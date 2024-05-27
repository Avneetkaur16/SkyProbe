import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEditFlight = () => {
  const { flight_id } = useParams()
  const [flight, setFlight] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlight = async() => {
      try {
        const { data } = await axios.get(`/flight/${flight_id}`)
        console.log(data)
        setFlight(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchFlight();
  }, [flight_id]);

  console.log(flight)

  const handleSave = async() => {
    try {
      const { data } = await axios.put(`/flight/edit/${flight_id}`, flight);
      navigate(`/admin/flight/${flight_id}`)
      console.log(data);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='admin-flight-page-main'>
        <h2>Edit Flight Information</h2>
        <div className='admin-flight-page-container'>
          <img src={flight.airlineLogo} alt='' />
          <div className='admin-flight-info'>
            <h4>Flight Number:</h4>
            <p>{flight?.flightNumber}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Airline:</h4>
            <p>{flight?.airline}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Origin:</h4>
            <p>{flight?.origin?.airport} | {flight?.origin?.code} | {flight?.origin?.city} | {flight?.origin?.country}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Destination:</h4>
            <p>{flight?.destination?.airport} | {flight?.destination?.code} | {flight?.destination?.city} | {flight?.destination?.country}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Departure Date</h4>
            <input type='date' value={flight?.origin?.date} onChange={(e) => setFlight({ ...flight, origin: { ...flight.origin, date: e.target.value }  })} />
          </div>
          <div className='admin-flight-info'>
            <h4>Departure Time</h4>
            <input type='time' value={flight?.origin?.time} step='1' onChange={(e) => setFlight({ ...flight, origin: { ...flight.origin, time: e.target.value } })} />
          </div>
          <div className='admin-flight-info'>
            <h4>Seats:</h4>
            <input type='number' value={flight?.seats} onChange={(e) => setFlight({ ...flight, seats: Number(e.target.value) })} />
          </div>
          <div className='admin-flight-info'>
            <h4>Economy Ticket Price:</h4>
            <input type='number' value={flight?.economy?.cost} onChange={(e) => setFlight({ ...flight, economy: { ...flight.economy, cost: Number(e.target.value) }  })} />
          </div>
          <div className='admin-flight-info'>
            <h4>Business Ticket Price:</h4>
            <input type='number' value={flight?.business?.cost} onChange={(e) => setFlight({ ...flight, business: { ...flight.business, cost: Number(e.target.value) } })} />
          </div>
          <button onClick={handleSave}>Save Changes</button>
        </div>
    </div>
  )
}

export default AdminEditFlight