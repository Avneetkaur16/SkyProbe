import React, { useEffect, useState } from 'react';
import './adminflightpage.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminFlightPage = () => {
  const flight_id = useParams()
  const [flight, setFlight] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlight = async() => {
        try {
            const { data } = await axios.get(`/flight/${flight_id.flight_id}`);
            setFlight(data);
        } catch (error) {
            console.log(error);
        }
    }

    fetchFlight();
  }, [flight_id]);

  console.log(flight);

  return (
    <div className='admin-flight-page-main'>
        <h2>Flight Information</h2>
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
            <p>{flight?.origin?.airport} {flight?.origin?.code}, {flight?.origin?.city}, {flight?.origin?.country}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Destination:</h4>
            <p>{flight?.destination?.airport} {flight?.destination?.code}, {flight?.destination?.city}, {flight?.destination?.country}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Departure Date</h4>
            <p>{flight?.origin?.date.slice(0, 10)}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Departure Time</h4>
            <p>{flight?.origin?.time}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Seats:</h4>
            <p>{flight?.seats}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Economy Ticket Price:</h4>
            <p>${flight?.economy?.cost}</p>
          </div>
          <div className='admin-flight-info'>
            <h4>Business Ticket Price:</h4>
            <p>${flight?.business?.cost}</p>
          </div>
          <button onClick={() => navigate(`/admin/flight/edit/${flight?._id}`)}>Edit Flight</button>
        </div>
    </div>
  )
}

export default AdminFlightPage