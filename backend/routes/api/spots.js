const express = require('express')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage, User } = require('../../db/models');







const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Latitude is not valid'),
      check('lng')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ min: 1, max:50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];













router.get('/', async(req, res, next)=> {
   const spots = await Spot.findAll({
    include: [{
        model: Review,
        attributes: ['stars']

   },  {model: SpotImage}]
});
let spotsList = [];
spots.forEach(spot => {
    spotsList.push(spot.toJSON())
})
let avg = 0;
let count = 0;
spotsList.forEach(spot => {
    spot.SpotImages.forEach(image => {
        // console.log(image.url)
        if(image.preview === true){
            // console.log('in')
            spot.previewImage = image.url
        }
    })
// console.log(spot.Reviews)
spot.Reviews.forEach(review => {
    if(review.stars !== undefined){
        count++
        avg += Number(review.stars)
    }
})
    if(!spot.previewImage){
        spot.previewImage = "no preview image found"
    }
    if(count === 0){
        spot.avgRating ="no reviews on this spot yet"
    }
    else {
        spot.avgRating = avg / count;
    }
    avg = 0;
    count = 0;
// console.log(spotsList);
delete spot.SpotImages
delete spot.Reviews
})
// console.log(spotsList[0].SpotImages[0].previewImage)
//    const allSpots = User.findAll();
    res.json({spotsList})

})




router.post('/', requireAuth, validateSpot, async (req, res, next) =>{

    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price,
        ownerId: req.user.dataValues.id
    })
    console.log(req.user.dataValues.id)
    res.json(newSpot)
})




router.put('/api/spots/:spotId', requireAuth, async (req, res, next)=> {

})





module.exports = router;
