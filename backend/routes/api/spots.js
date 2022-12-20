const express = require('express')
const router = express.Router();
// const { setTokenCookie, restoreUser } = require('../../utils/auth');
// const { User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage } = require('../../db/models');

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




router.post('/', async (req, res, next) =>{

    res.send("in here")
})






module.exports = router;
