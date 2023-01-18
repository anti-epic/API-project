
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './createSpot.css'

const EditSpot = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState()





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
    dispatch(createSpotThunk(payload));
 history.push(`/spots`);
//  history.push(`/spots/${spotObj.id}`);
}

    return(

    <div className='editContainer'>


        <form className='createForm' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='address'
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
        <input
          type="text"
          placeholder='city'
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
        <input
          type="text"
          placeholder='state'
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
          />
        <input
          type="text"
          placeholder='country'
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          />
        <input
          type="number"
          placeholder='lat'
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          />
        <input
          type="number"
          placeholder='lng'
          required
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          />
        <input
          type="text"
          placeholder='name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        <input
          type="textArea"
          placeholder='description'
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      <input
          type="number"
          placeholder='price'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          />

        <input className='submitCreateInfo' type='submit' value='create Spot'></input>

        </form>



    </div>




    );
}



export default EditSpot