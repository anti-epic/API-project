const express = require('express')
const router = express.Router();
const {requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');








router.get('/', async(req,res,next) =>{
    res.send('in reviews')
})













router.get('/current', requireAuth, async(req,res,next) =>{
const {id} = req.user
console.log(id)
    const Reviews = await Review.findAll({
        where: {userid: id},
        include: {model: ReviewImage}

    })
    const userInfo = await User.findByPk(id, {

            attributes: ['id', 'firstName', 'lastName']

    })

    let spotsIds = [];

    Reviews.forEach(review => {
        review.dataValues.User = userInfo
        spotsIds.push(review.dataValues.spotId)



    })
    // console.log(spotsIds)
let spots
    for(let i = 0; i < spotsIds.length; i++){
        let spotId = spotsIds[i]
        spots = await Spot.findByPk(spotId,
            {include: [
                {model: SpotImage,
                attributes: ['preview', 'url']}
            ]
    })


    // if(image.dataValues.preview === true){
    //     spot.dataValues.previewImage = image.url
    // }
    // else {
    //     let none ="no preview image found"
    //     spot.dataValues.previewImage = none
    // }




        Reviews[i].dataValues.Spot = spots;



        Reviews[i].dataValues.Spot.SpotImages.forEach(image =>{
            console.log('testing', image.dataValues)
            if(!Reviews[i].dataValues.Spot.dataValues.previewImage){
             if(image.dataValues.preview === true){
            Reviews[i].dataValues.Spot.dataValues.previewImage = image.url

    }
    else {
        let none ="no preview image found"
        Reviews[i].dataValues.Spot.dataValues.previewImage = none
    }
}
   delete Reviews[i].dataValues.Spot.dataValues.SpotImages
   delete Reviews[i].dataValues.Spot.dataValues.createdAt
   delete Reviews[i].dataValues.Spot.dataValues.updatedAt
   delete Reviews[i].dataValues.Spot.dataValues.description
        })










        // console.log(Reviews[i].dataValues.Spot.SpotImages)
    }

    res.json({Reviews})
})


router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const {reviewId} = req.params;
    const {url} = req.body;
    console.log(reviewId)

    let review = await Review.findByPk(reviewId)
    if(!review){
        res.statusCode = 404;
        res.json(
            {
                "message": "Review couldn't be found",
                "statusCode": res.statusCode
              }
        )
    }
    if(review.userId !== req.user.id){
        res.statusCode = 403;
       res.json ({
            "message": "Forbidden",
            "statusCode": res.statusCode
          })
    }
    // console.log(typeof review.userId,typeof req.user.id)
    let reviewImages = await ReviewImage.findAll({
        where: {reviewId: reviewId},
    })
    if(reviewImages.length > 9){
        res.statusCode = 403;
        res.json({

                "message": "Maximum number of images for this resource was reached",
                "statusCode": res.statusCode

        })

    }

   let newReviewImage = await ReviewImage.create({
    reviewId
    ,url
})


    res.json({id: newReviewImage.id,
        url: newReviewImage.url})

});



module.exports = router;
