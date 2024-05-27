import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './search.css';
import { useNavigate } from 'react-router-dom'
import { SeatsContext } from '../../context/SeatsContext';
import { CategoryContext } from '../../context/CategoryContext';
import _ from 'lodash';

const Search = () => {
    const [search, setSearch] = useState({ origin: '', destination: '', date: '', seats: 1, category: 'economy' });
    const [count, setCount] = useState(search.seats);
    const { searchDispatch } = useContext(SearchContext);
    const { seatsDispatch } = useContext(SeatsContext);
    const { categoryDispatch } = useContext(CategoryContext);
    const navigate = useNavigate();

    console.log(search);

    const handleSearch = async() => {
        try {
            searchDispatch({ type: "SEARCH_START" });
            seatsDispatch({ type: "SEARCH_START" });
            categoryDispatch({ type: "CATEGORY_START" });

            const { data } = await axios.get(`/flight/search/${search.origin}/${search.destination}/${search.date}/${count}/${search.category}`);
            searchDispatch({ type: "SEARCH_SUCCESS", payload: data });
            seatsDispatch({ type: "SEATS_SUCCESS", payload: count });
            categoryDispatch({ type: "CATEGORY_SUCCESS", payload: search.category });

            navigate('/search');
            
        } catch(error) {
            console.log(error);
            searchDispatch({ type: "SEARCH_FAILURE", payload: error });
            seatsDispatch({ type: "SEATS_FAILURE" });
            categoryDispatch({ type: "CATEGORY_FAILURE" });
        }
    }
  return (
    <>
    <div className='search_main'>
        <div className='search_field'>
            <label name="origin">Origin</label>
            <input id="origin" type="text" value={search.origin} onChange={(e) => setSearch({ ...search, origin: _.capitalize(e.target.value) })} />
        </div>
        <div className='search_field'>
            <label name="destination">Destination</label>
            <input id="destination" type="text" value={search.destination} onChange={(e) => setSearch({ ...search, destination: _.capitalize(e.target.value) })} />
        </div>
        <div className='search_field'>
            <label name="date">Date</label>
            <input id="date" type="date" value={search.date} onChange={(e) => setSearch({ ...search, date: e.target.value })} />
        </div>
        <div className='search_field'>
            <label name="seats">Seats</label>
            <input id="seats" type="text" value={count} onChange={(e) => setSearch({ ...search, seats: e.target.value })} />
            <div className='search_seats'>
                <button value={count} onClick={() => setCount((prev) => prev + 1)}>+</button>
                <button value={count} onClick={() => count > 1 ? setCount((prev) => prev - 1) : setCount(1)}>-</button>
            </div>
        </div>
        <div className='search_field'>
            <label name="category">Category</label>
            <select value={search.category} onChange={(e) => setSearch({ ...search, category: e.target.value })}>
                <option>Economy</option>
                <option>Business</option>
            </select>
        </div>
        <div className='search_field'>
            <button className='search_button' onClick={handleSearch}>Search</button>
        </div>
    </div>
    </>
  )
}

export default Search