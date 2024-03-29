const express = require('express')
const router = express.Router();
const {requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');




router.get('/', async(req, res ,next) => {

    res.send('in get')
})



router.delete('/:imageId', requireAuth, async(req, res, next) => {
  const {imageId} = req.params;
    let spotImage = await SpotImage.findByPk(imageId)
    if(!spotImage){
      res.statusCode = 404;
     return res.json({
        "message": "Spot Image couldn't be found",
        "statusCode": res.statusCode
    })
  }
  let currUser = req.user.id;
  let spotsId = spotImage.dataValues.spotId
  let spot = await Spot.findByPk(spotsId)
  let spotsOwner = spot.dataValues.ownerId

if(currUser !== spotsOwner){
  res.statusCode = 403;
  return res.json({
    message: "Forbidden, you can not delete a image to a spot you dont own",
    statusCode: res.statusCode,

  })
}

spotImage.destroy();

  res.statusCode = 200;
   return res.json({
      message: "Successfully deleted",
      statusCode: res.statusCode
    })
})

module.exports = router;
