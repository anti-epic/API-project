const express = require('express')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, Review, SpotImage, User, Booking } = require('../../db/models');







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











  router.post('/:spotId/bookings',handleValidationErrors, async (req, res, next) => {
    const {spotId} = req.params;
    const userId = req.user.id
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        res.statusCode = 404;
       return res.json({

                "message": "Spot couldn't be found",
                "statusCode": res.statusCode
        })
    }

    const spotParsed = spot.toJSON()
    const ownerId = spotParsed.ownerId

    if(userId === ownerId){
        res.statusCode = 400;
     return   res.json({
            "message": "You can not book a spot you own",
            "statusCode": res.statusCode
        })
    }


    const { startDate, endDate } = req.body
    // console.log(startDate, endDate)
    startDateParsed = startDate.split('-')
    endDateParsed = endDate.split('-')
    const newStart = new Date(startDateParsed[0],startDateParsed[1],startDateParsed[2])

    // console.log(newStart.toDateString(), 'newstart')
    const newStartExactTime = newStart.getTime()
// console.log(newStart)
    const newEnd = new Date(endDateParsed[0],endDateParsed[1],endDateParsed[2])
    const newEndExactTime = newEnd.getTime()

    // console.log(typeof startDate,newStartExactTime,newEndExactTime)
        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            }
        })
        // console.log(bookings)

if(newStartExactTime > newEndExactTime){
    res.statusCode = 400;
    res.json({
        "message": "Validation error",
        "statusCode": res.statusCode,
        "errors": {
          "endDate": "endDate cannot be on or before startDate"
        }
    })
}




        bookings.forEach(booking => {

                if(booking.dataValues.startDate){
                        // console.log(booking.dataValues)
                    const bookedStart = booking.dataValues.startDate.getTime()



                    const bookedEnd = booking.dataValues.endDate.getTime()

                    // console.log(bookedEnd,bookedStart, newStartExactTime)


                    if(newStartExactTime < bookedStart && newEndExactTime > bookedEnd){
                        res.statusCode = 403;
                        return res.json({
                          "message": "Sorry, this spot is already booked for the specified dates",
                         "statusCode": res.statusCode,
                         "errors": {
                          "startDate": "Start date conflicts with an existing booking",
                          "endDate": "End date conflicts with an existing booking"
                         }})
                    }



                    if(newStartExactTime >= bookedStart && newStartExactTime <= bookedEnd){
                        res.statusCode = 403;
                      return res.json({
                        "message": "Sorry, this spot is already booked for the specified dates",
                       "statusCode": res.statusCode,
                       "errors": {
                        "startDate": "Start date conflicts with an existing booking"

                       }})


                    }

                    if(newEndExactTime >= bookedStart && newEndExactTime <= bookedEnd){
                        res.statusCode = 403;
                        return res.json({
                          "message": "Sorry, this spot is already booked for the specified dates",
                          "statusCode": res.statusCode,
                         "errors": {
                           "endDate": "End date conflicts with an existing booking"
                         }})



                      }

                }
            // console.log(booking.dataValues.startDate,'in a booking')
        })
        // console.log(startDate,endDate)
        const confirmedNewBookings = await Booking.create({
            startDate: newStart,
            endDate: newEnd,
            spotId: spotId,
            userId: userId
        })

    res.json(
        confirmedNewBookings

    )
})









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
    // console.log(req.user.dataValues.id)
    res.statusCode = 201;
    res.json(newSpot)
})


router.get('/current', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [{
            model: Review,
            attributes: ['stars']

       },
       {model: SpotImage}
    ],
        where: { ownerId : req.user.dataValues.id }
    })


let spotsList = spots

// console.log(spotsList)

spotsList.forEach(spot => {
    let avg = 0;
let count = 0;
//    console.log(spot.dataValues)
   spot.dataValues.Reviews.forEach(review => {
    if(review.stars !== undefined){
        // console.log(count, 'in', review.stars)
        count++
        avg += Number(review.stars)
    }
})


spot.dataValues.SpotImages.forEach(image => {

    if(image.dataValues.preview === true){
        spot.dataValues.previewImage = image.url
    }
    else {
        let none ="no preview image found"
        spot.dataValues.previewImage = none
    }
})


if(!spot.dataValues.previewImage){
    let none ="no preview image found"
    spot.dataValues.previewImage = none
}


    if(count === 0){
       let avgRating = "no reviews on this spot yet"
       spot.dataValues.avgRating = avgRating
    }
    else {
        let avgRating = avg / count;
        spot.dataValues.avgRating = avgRating
    }
    delete spot.dataValues.SpotImages
    delete spot.dataValues.Reviews
})



delete spotsList.Reviews
res.json({spotsList})




});




router.put('/:spotId', requireAuth, validateSpot, async (req, res, next)=> {
const {spotId} = req.params
    updateSpot = await Spot.findByPk(spotId)

    // console.log(updateSpot.ownerId, 'owner Id')
    // console.log(req.user.dataValues.id)
    if(!updateSpot){
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
          })
    }
        if(updateSpot.ownerId === req.user.dataValues.id){
            const {price, description, name, lng, lat, country, state, city, address} = req.body

            if(price){
                updateSpot.price = price;
            }
            if(description){
                updateSpot.description = description;
            }
            if(name){
                updateSpot.name = name;
            }
            if(lng){
                updateSpot.lng = lng;
            }
            if(lat){
                updateSpot.lat = lat;
            }
            if(country){
                updateSpot.country = country;
            }
            if(state){
                updateSpot.state = state;
            }
            if(city){
                updateSpot.city = city;
            }
            if(address){
                updateSpot.address = address;
            }
            await updateSpot.save()

            // console.log(updateSpot)
              return res.json({updateSpot})
        }


res.statusCode = 403;
    return res.json({
       error: "you do not have access to editing a spot you are not the owner of",
       statusCode: res.statusCode
    })


})



router.delete('/:id', requireAuth, async (req, res, next)=> {
const {id} = req.params;
deleteSpot = await Spot.findByPk(id)
if(!deleteSpot){
    res.statusCode = 404;
    res.json({
        "message": "Spot couldn't be found",
        "statusCode": res.statusCode
      })
}
console.log(deleteSpot.ownerId)
console.log(req.user.id)
if(deleteSpot.ownerId === req.user.id){
    await deleteSpot.destroy();
  return  res.json({message : "Successfully deleted",
                statusCode: res.statusCode })
}


res.statusCode = 403;
res.json({error: "you do not have access to editing a spot you are not the owner of",
statusCode: res.statusCode})
})



// router.use((err, _req, res, _next) => {
//     // if(err){
//     //     next(err)
//     // }
//     // console.log(err.errors, 'here')
//     // res.statusCode = 404;
//     // return res.json({
//     //     message: "Spot couldn't be found",
//     //     statusCode: res.statusCode

//     //   });
// })

router.get('/:spotId', async (req,res,next)=> {
    const {spotId} = req.params;

    const spot = await Spot.findByPk(spotId,{
        include: [{
            model: Review,
            attributes: ['stars']

       },  {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
    }, {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
    }]
    })

    if(!spot){
        res.statusCode = 404
    res.json({
        "message": "Spot couldn't be found",
        "statusCode": res.statusCode
      })
    }
    let avg = 0;
    let count = 0;
let spotList = spot.toJSON()

// console.log(spotList.Reviews)
spotList.Reviews.forEach(review => {
    // console.log(review)
    if(review.stars !== undefined){
        console.log(count, 'in')
        count++
        avg += Number(review.stars)
    }

})

// console.log(spotList.SpotImages)

if(count === 0){
    spotList.avgRating ="no reviews on this spot yet"
}
else {
    spotList.avgRating = avg / count;
}

// if(spot.SpotImages.image.preview === true){
//     console.log('in image')
//     spot.previewImage = image.url
// }

// delete spotList.SpotImages
spotList.numReviews = count;
delete spotList.Reviews
res.json(spotList)
})




router.get('/:spotId/bookings',requireAuth, async (req, res, next) => {
    const {spotId} = req.params;
    // console.log(spotId)
    // console.log(req.user.id)

    const userId = req.user.id;
    const Bookings = await  Booking.findAll({
        attributes: {exclude: ['userId','createdAt', 'updatedAt','id']},
        where: {
            spotId: spotId
        },


    })
    const spot = await Spot.findByPk(spotId)
    // console.log(spot.ownerId)
    if(!spot){
        res.statusCode = 404;
        res.json({

                "message": "Spot couldn't be found",
                "statusCode": res.statusCode

        })
    }

    const spotOwner = spot.ownerId
    if(spotOwner !== userId){
        res.json({
            Bookings


        })
    }
    const ownersBookingsInfo = await  Booking.findAll({

        where: {
            spotId: spotId
        },
    })
    const owner = await User.findOne({spotOwner,
    attributes: ['id','firstName', 'lastName']})

    if(spotOwner === userId){
       return res.json({ owner, ownersBookingsInfo})
    }

})



module.exports = router;
