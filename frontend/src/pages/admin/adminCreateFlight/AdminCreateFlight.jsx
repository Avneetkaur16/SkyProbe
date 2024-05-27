import React, { useEffect, useState } from 'react';
import './admincreateflight.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCreateFlight = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({});
  const [origin, setOrigin] = useState({ city: '', airport: '', code: '', country: '', date: '', time: '', timezone: '' });
  const [destination, setDestination] = useState({ city: '', airport: '', code: '', country: '', date: '', time: '', timezone: '' });
  const [economy, setEconomy] = useState({ cost: 0, seats: 0 });
  const [business, setBusiness] = useState({ cost: 0, seats: 0 });

  const [newFlight, setNewFlight] = useState({ 
    flightNumber: '', 
    airline: '', 
    airlineLogo: '', 
    seats: 0,
    origin: {},
    destination: {},
    economy: {},
    business: {}
  });

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem("admin")));
  }, []);

  const handleCreate = async(e) => {
    e.preventDefault();
    setNewFlight({ ...newFlight, origin: origin, destination: destination, economy: economy, business: business });
    try {
      const { data } = await axios.post('/flight/create', { ...newFlight, origin: origin, destination: destination, economy: economy, business: business });
      console.log(data);
      navigate(`/admin/flight/${data?._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='create-flight-main'>
      <div className='create-flight-nav'>
        <h2>Create New Flight</h2>  
        <p onClick={() => navigate(`/admin/profile/${admin._id}`)}>Dashboard</p>
      </div>

      <form className='create-flight-container'>
        <label>Flight Number</label>
        <input type='text' value={newFlight.flightNumber} required onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })} placeholder='Enter Flight Number'/>

        <label>Airline</label>
        <input type='text' value={newFlight.airline} required onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })} placeholder='Enter Airline Name' />

        <label>Airline Logo</label>
        <input type='text' value={newFlight.airlineLogo} required onChange={(e) => setNewFlight({ ...newFlight, airlineLogo: e.target.value })} placeholder='Enter Airline Logo URL' />

        <label>Seats</label>
        <input type='number' value={newFlight.seats} required onChange={(e) => setNewFlight({ ...newFlight, seats: e.target.value })} placeholder='Enter Available Seats' />

        <label>Origin City</label>
        <input type='text' value={origin.city} required onChange={(e) => setOrigin({ ...origin, city: e.target.value })} placeholder='Enter Origin City' />

        <label>Origin Airport</label>
        <input type='text' value={origin.airport} required onChange={(e) => setOrigin({ ...origin, airport: e.target.value })} placeholder='Enter Origin Airport' />

        <label>Origin Airport Code</label>
        <input type='text' value={origin.code} required onChange={(e) => setOrigin({ ...origin, code: e.target.value }) } placeholder='Enter Origin Airport Code' />

        <label>Origin Country</label>
        <input type='text' value={origin.country} required onChange={(e) => setOrigin({ ...origin, country: e.target.value })} placeholder='Enter Origin Country' />

        <label>Departure Date</label>
        <input type='date' value={origin.date} required onChange={(e) => setOrigin({ ...origin, date: e.target.value })} placeholder='Enter Departure Date' />

        <label>Departure Time</label>
        <input type='time' step='1' value={origin.time} required onChange={(e) => setOrigin({ ...origin, time: e.target.value })} placeholder='Enter Departure Time' />

        <label>Origin Timezone</label>
        <input type='text' value={origin.timezone} required onChange={(e) => setOrigin({ ...origin, timezone: e.target.value })} placeholder='Enter Origin Timezone' />

        <label>Destination City</label>
        <input type='text' value={destination.city} required onChange={(e) => setDestination({ ...destination, city: e.target.value })} placeholder='Enter Destination City' />

        <label>Destination Airport</label>
        <input type='text' value={destination.airport} required onChange={(e) => setDestination({ ...destination, airport: e.target.value })} placeholder='Enter Destination Airport' />

        <label>Destination Airport Code</label>
        <input type='text' value={destination.code} required onChange={(e) => setDestination({ ...destination, code: e.target.value }) } placeholder='Enter Destination Airport Code' />

        <label>Destination Country</label>
        <input type='text' value={destination.country} required onChange={(e) => setDestination({ ...destination, country: e.target.value })} placeholder='Enter Destination Country' />

        <label>Arrival Date</label>
        <input type='date' value={destination.date} required onChange={(e) => setDestination({ ...destination, date: e.target.value })} placeholder='Enter Arrival Date' />

        <label>Arrival Time</label>
        <input type='time' value={destination.time} required onChange={(e) => setDestination({ ...destination, time: e.target.value })} placeholder='Enter Arrival Time' />

        <label>Destination Timezone</label>
        <input type='text' value={destination.timezone} required onChange={(e) => setDestination({ ...destination, timezone: e.target.value })} placeholder='Enter Destination Timezone' />

        <label>Economy Price</label>
        <input type='number' value={economy.cost} required onChange={(e) => setEconomy({ ...economy, cost: e.target.value })} placeholder='Enter Economy Ticket Price' />

        <label>Economy Seats</label>
        <input type='number' value={economy.seats} required onChange={(e) => setEconomy({ ...economy, seats: e.target.value })} placeholder='Enter Economy Seat Count' />

        <label>Business Price</label>
        <input type='number' value={business.cost} required onChange={(e) => setBusiness({ ...business, cost: e.target.value })} placeholder='Enter Business Ticket Price' />

        <label>Business Seats</label>
        <input type='number' value={business.seats} required onChange={(e) => setBusiness({ ...business, seats: e.target.value })} placeholder='Enter Business Seat Count' />

        <button className='create-flight-button' onClick={handleCreate}>Create Flight</button>
      </form>
    </div>
  )
}

export default AdminCreateFlight