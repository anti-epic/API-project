const express = require('express')
const router = express.Router();
const {requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');


const validateUpdatedReview = [
    check('review')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .withMessage('Stars must be an integer from 1 to 5'),

    handleValidationErrors
  ];








router.get('/', async(req,res,next) =>{
    res.send('in reviews')
})













router.get('/current', requireAuth, async(req,res,next) =>{
const {id} = req.user
    const Reviews = await Review.findAll({
        where: {userId: id},
        include: {model: ReviewImage,
        attributes: ['id', 'url']}

    })
    const userInfo = await User.findByPk(id, {

            attributes: ['id', 'firstName', 'lastName']

    })

    let spotsIds = [];

    Reviews.forEach(review => {
        review.dataValues.User = userInfo
        spotsIds.push(review.dataValues.spotId)



    })
let spots
    for(let i = 0; i < spotsIds.length; i++){
        let spotId = spotsIds[i]
        spots = await Spot.findByPk(spotId,
            {include: [
                {model: SpotImage,
                attributes: ['preview', 'url']}
            ]
    })





        Reviews[i].dataValues.Spot = spots;



        Reviews[i].dataValues.Spot.SpotImages.forEach(image =>{
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


    }

   return res.json({Reviews})
})


router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const {reviewId} = req.params;
    const {url} = req.body;

    let review = await Review.findByPk(reviewId)
    if(!review){
        res.statusCode = 404;
      return  res.json(
            {
                "message": "Review couldn't be found",
                "statusCode": res.statusCode
              }
        )
    }
    if(review.userId !== req.user.id){
        res.statusCode = 403;
     return  res.json ({
            "message": "Forbidden, you can not add a image to a review you didnt create",
            "statusCode": res.statusCode
          })
    }
    let reviewImages = await ReviewImage.findAll({
        where: {reviewId: reviewId},
    })
    if(reviewImages.length > 9){
        res.statusCode = 403;
      return  res.json({

                "message": "Maximum number of images for this resource was reached",
                "statusCode": res.statusCode

        })

    }

   let newReviewImage = await ReviewImage.create({
    reviewId
    ,url
})


   return res.json({id: newReviewImage.id,
        url: newReviewImage.url})

});



router.put('/:reviewId', validateUpdatedReview, requireAuth, async(req, res, next) => {
    const { reviewId } = req.params
    const {review, stars} = req.body
    const currentUser = req.user.id
        let updateReview = await Review.findByPk(reviewId);

        if(!updateReview){
            res.statusCode = 404;
          return  res.json({
                "message": "Review couldn't be found",
                "statusCode":  res.statusCode
            })
        }
        let reviewOwner = updateReview.dataValues.userId
        if(currentUser !==  reviewOwner){
            res.statusCode = 403;
           return res.json({
                "message": "You can not modify a review you did not make",
                statusCode: res.statusCode

            })
        }
        updateReview.review = review;
        updateReview.stars = stars;
        updateReview.save()
return res.json(updateReview)
})


router.delete('/:reviewId',requireAuth, async(req,res,next)=> {
    const {reviewId} = req.params;
    const currUser = req.user.id;
    let review = await Review.findByPk(reviewId)

    if(!review){
        res.statusCode = 404;
      return  res.json({
            "message": "Review couldn't be found",
            "statusCode": res.statusCode
        })
    }
    const ownerId = review.dataValues.userId

    if(currUser !== ownerId){
        res.statusCode = 403;
      return  res.json({
            message: "Forbidden, you can not delete a review you did not create",
            statusCode:   res.statusCode
        })
    }

    review.destroy();
    res.statusCode = 200;
   return res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode
   })
})


module.exports = router;
