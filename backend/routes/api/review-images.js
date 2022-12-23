const express = require('express')
const router = express.Router();
const {requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');






router.get('/', async(req, res ,next) => {
    // console.log('in get')
    res.send('in get')
})





router.delete('/:imageId',requireAuth, async(req, res, next)=> {
    const {imageId} = req.params;
    const currUser = req.user.id;
    const reviewImage = await ReviewImage.findByPk(imageId)

    if(!reviewImage){
        res.statusCode = 404;
      return  res.json({
            "message": "Review Image couldn't be found",
            "statusCode": res.statusCode
        })
    }



    let reviewId = reviewImage.dataValues.reviewId
    const review = await Review.findByPk(reviewId);
    const reviewOwner = review.dataValues.userId
    if(reviewOwner !== currUser){
        res.statusCode = 403;
       return  res.json({
            "message": "Forbidden, you can not delete a image on a review you didnt create",
            "statusCode": res.statusCode
        })
    }
console.log(imageId, currUser)
    reviewImage.destroy();
    res.statusCode = 200;
return res.json({
    "message": "Successfully deleted",
    "statusCode": res.statusCode
})
    })




module.exports = router;
