
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './editSpot.css'

const EditSpot = ({}) => {
    const history = useHistory();
    const dispatch = useDispatch();
   const {spotId} =  useParams();
    const spotObj = useSelector(state => state.spots);
    const [address, setAddress] = useState(spotObj.address);
    const [city, setCity] = useState(spotObj.city);
    const [state, setState] = useState(spotObj.state);
    const [country, setCountry] = useState(spotObj.country);
    const [name, setName] = useState(spotObj.name);
    const [description, setDescription] = useState(spotObj.description);
    const [price, setPrice] = useState(spotObj.price)





if(!spotObj){
    return null
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {

        address,
        city,
        state,
        country,
        name,
        description,
        price
    }
    dispatch(editSpotThunk(payload, spotId));

 history.push(`/spots/${spotObj.id}`);
}
console.log(spotObj, 'here')
    return spotObj.length ? (

    <div className='editContainer'>

<div className='formTitle'>Edit A Spot</div>
        <form className='editForm' onSubmit={handleSubmit}>
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
          placeholder={name}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        <input
          type="textArea"
          placeholder={description}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      <input
          type="number"
          placeholder={price}
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          />

        <input className='submitUpdatedInfo' type='submit' value='Updates Spot'></input>

        </form>



    </div>




    ) : (
      <div className='editContainer'>
<div className='formTitle'> Edit A Spot</div>

      <form className='editForm' onSubmit={handleSubmit}>
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

      <input className='submitUpdatedInfo' type='submit' value='Update Spot'></input>

      </form>



  </div>

    );
}



export default EditSpot
