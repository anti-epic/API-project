
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSpotThunk, createImageForSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './createSpot.css'

const CreateSpot = () => {
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
    const [img, setImg] = useState("")




const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(  'start',      address,
        city,
        state,
        country,

        name,
        description,
        price, 'end')



    const payload = {
        address,
        city,
        state,
        country,
        name,
        description,
        price
    }

    const imgPayload = {
      url :img,
      preview: true
    }


 dispatch(createSpotThunk(payload, imgPayload));


 history.push(`/`);

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
          placeholder='url img'
                        type="url"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        required
                    />
      <input
          type="number"
          placeholder='price'
          min='0'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          />

        <input className='submitCreateInfo' type='submit' value='create Spot'></input>

        </form>



    </div>




    );
}



export default CreateSpot
