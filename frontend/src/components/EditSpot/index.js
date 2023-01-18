
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editSpotThunk, getSpot } from '../../store/spots';
import { useHistory } from 'react-router-dom';

const EditSpot = ({}) => {
    const history = useHistory();
    const dispatch = useDispatch();
   const {spotId} =  useParams();
    const spotObj = useSelector(state => state.spots);
    const [address, setAddress] = useState(spotObj.address);
    const [city, setCity] = useState(spotObj.city);
    const [state, setState] = useState(spotObj.state);
    const [country, setCountry] = useState(spotObj.country);
    const [lat, setLat] = useState(spotObj.lat);
    const [lng, setLng] = useState(spotObj.lng);
    const [name, setName] = useState(spotObj.name);
    const [description, setDescription] = useState(spotObj.description);
    const [price, setPrice] = useState(spotObj.price)

console.log(spotObj, 'here4')

useEffect(() => {
    dispatch(getSpot(spotId))
},[spotId])

if(!spotObj){
    return null
}

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(  'start',      address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price, 'end')
    const payload = {

        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    }
    dispatch(editSpotThunk(payload, spotId));

 history.push(`/spots/${spotObj.id}`);
}

    return(

    <div>hi

        {spotObj.id}
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={address}
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
        <input
          type="text"
          placeholder={city}
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
        <input
          type="text"
          placeholder={state}
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
          />
        <input
          type="text"
          placeholder={country}
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          />
        <input
          type="text"
          placeholder={lat}
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          />
        <input
          type="text"
          placeholder={lng}
          required
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          />
        <input
          type="text"
          placeholder={name}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        <input
          type="text"
          placeholder={description}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      <input
          type="text"
          placeholder={price}
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          />

        <input type='submit'></input>

        </form>



    </div>




    );
}



export default EditSpot
