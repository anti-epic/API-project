const express = require('express')
const router = express.Router();
const {requireAuth} = require('../../utils/auth');
const {check, query} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const {Op} = require("sequelize");
const {
    Spot,
    Review,
    SpotImage,
    User,
    Booking,
    ReviewImage
} = require('../../db/models');

const validateBookings = [
    check('startDate')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Must have a start date'),
    check('endDate')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('must have a end date'),
    handleValidationErrors
  ];



const validateReview = [
    check('review').exists(
        {checkFalsy: true}
    ).isLength(
        {min: 1}
    ).withMessage('Review text is required'),
    check('stars').exists(
        {checkFalsy: true}
    ).isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),

    handleValidationErrors
];


const validateSpot = [
    check('address').exists(
        {checkFalsy: true}
    ).isLength(
        {min: 1}
    ).withMessage('Street address is required'),
    check('city').exists(
        {checkFalsy: true}
    ).isLength(
        {min: 1}
    ).withMessage('City is required'),
    check('state').exists(
        {checkFalsy: true}
    ).isLength(
        {min: 1}
    ).withMessage('State is required'),
    check('country').exists(
        {checkFalsy: true}
    ).isLength(
        {min: 1}
    ).withMessage('Country is required'),
    check('name').exists(
        {checkFalsy: true}
    ).isLength(
        {min: 1, max: 50}
    ).withMessage('Name must be less than 50 characters'),
    check('description').exists(
        {checkFalsy: true}
    ).isLength(
        {min: 1}
    ).withMessage('Description is required'),
    check('price').exists(
        {checkFalsy: true}
    ).isFloat().withMessage('Price per day is required'),
    handleValidationErrors
];


const validateImage = [
    check('url').exists(
        {checkFalsy: true}
    ).isLength(
        {min: 1}
    ).withMessage('needs a image url'),
    check('preview').exists(
    ).isBoolean().withMessage('preview needs to be true or false'),

    handleValidationErrors
];


const validateQuery = [
    query('page').exists(
        {checkFalsy: true}
    ).optional(
        {nullable: true}
    ).isFloat(
        {min: 0}
    ).withMessage('Page must be greater than or equal to 0'),
    query('size').exists(
        {checkFalsy: false}
    ).optional(
        {nullable: true}
    ).isFloat(
        {min: 0}
    ).withMessage('Size must be greater than or equal to 0'),
    query('maxLat').exists(
        {checkFalsy: true}
    ).optional(
        {nullable: true}
    ).isFloat().withMessage('Maximum latitude is invalid'),
    query('minLat').exists(
        {checkFalsy: true}
    ).optional(
        {nullable: true}
    ).isFloat().withMessage('Minimum latitude is invalid'),
    query('maxLng').exists(
        {checkFalsy: true}
    ).optional(
        {nullable: true}
    ).isFloat().withMessage('Maximum longitude is invalid'),
    query('minLng').exists(
        {checkFalsy: true}
    ).optional(
        {nullable: true}
    ).isFloat().withMessage('Minimum longitude is invalid'),
    query('minPrice').exists(
        {checkFalsy: true}
    ).optional(
        {nullable: true}
    ).isFloat(
        {min: 0}
    ).withMessage('Maximum price must be greater than or equal to 0'),
    query('maxPrice').exists(
        {checkFalsy: true}
    ).optional(
        {nullable: true}
    ).isFloat(
        {min: 0}
    ).withMessage('Minimum price must be greater than or equal to 0'),
    handleValidationErrors
];


router.get('/', validateQuery, async (req, res, next) => {

    let {
        page,
        size,
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice
    } = req.query;

    const where = {};
    page = parseInt(page);
    size = parseInt(size);
    if (Number.isNaN(page))
        page = 0;


    if (Number.isNaN(size))
        size = 20;


    if (page > 10)
        page = 10;


    if (size > 20)
        size = 20;



    if (minLat) {
        minLat = Number(minLat);
        where.lat = {
            [Op.gte]: minLat
        }
    }

    if (maxLat) {
        maxLat = Number(maxLat);
        where.lat = {
            [Op.lte]: maxLat
        }
    }


    if (minLat && maxLat) {
        where.lat = {
            [Op.between]: [minLat, maxLat]
        }
    }


    if (minLng) {
        minLng = Number(minLng);
        where.lng = {
            [Op.gte]: minLng
        }
    }

    if (maxLng) {
        maxLng = Number(maxLng);
        where.lng = {
            [Op.lte]: maxLng
        }
    }


    if (minLng && maxLng) {
        where.lng = {
            [Op.between]: [minLng, maxLng]
        }
    }


    if (minPrice) {
        minPrice = Number(minPrice);
        where.price = {
            [Op.gte]: minPrice
        }
    }

    if (maxPrice) {
        maxPrice = Number(maxPrice);
        where.price = {
            [Op.lte]: maxPrice
        }
    }
    if (minPrice && maxPrice) {
        where.Price = {
            [Op.between]: [minPrice, maxPrice]
        }
    }

 const pagination = {}
    if (page > 0 && size > 0) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

    let spots =await Spot.findAll({
        where,
            ...pagination
    });

    let avg= 0;
    let count = 0;

for(let i = 0; i < spots.length; i++){
    avg = 0;
    count = 0;
    let currentSpot = spots[i];
    // console.log(currentSpot.dataValues.id)
    let currentSpotId = currentSpot.dataValues.id
    allCurrentReviews = await Review.findAll({where: {spotId: currentSpotId}})
    // console.log(allCurrentReviews)
    for(let j = 0; j < allCurrentReviews.length; j++){
        let currentReviews = allCurrentReviews[j];
        // console.log(currentReviews.dataValues.stars)
        if(currentReviews.dataValues.stars){
            count++
            avg += currentReviews.dataValues.stars
        }

    }
  let allSpotImages = await SpotImage.findAll({
        where: {spotId:currentSpotId}
    })
    for(let j = 0; j < allSpotImages.length; j++){
        let currentSpotImage = allSpotImages[j]
        // console.log(currentSpotImage.dataValues.preview)
        if(currentSpotImage.dataValues.preview === true){
            currentSpot.dataValues.previewImage = currentSpotImage.dataValues.url
        }
    }
    if(!currentSpot.dataValues.previewImage){
        currentSpot.dataValues.previewImage = "no preview image found"
    }




    if(count === 0){
        spots[i].dataValues.avgRating ="no reviews on this spot yet"
    }
    else {
        spots[i].dataValues.avgRating = avg / count;
    }

}


console.log(count, avg)


    // spotsList.forEach(spot => {
    //     spot.SpotImages.forEach(image => {
    //         // console.log(image.url)
    //         if(!image.preview){
    //             spot.previewImage = "no preview image found"
    //         }
    //         else if(image.preview === true){
    //             // console.log('in')
    //             spot.previewImage = image.url
    //         }
    //     })
    // // console.log(spot.Reviews)
    // spot.Reviews.forEach(review => {
    //     // console.log(review.stars)
    //     if(review.stars){
    //         count++
    //         avg += Number(review.stars)
    //     }
    // })

    //     if(!spot.previewImage){
    //         spot.previewImage = "no preview image found"
    //     }
    //     if(count === 0){
    //         spot.avgRating ="no reviews on this spot yet"
    //     }
    //     else {
    //         spot.avgRating = avg / count;
    //     }
    //     avg = 0;
    //     count = 0;
    // // console.log(spotsList);
    // delete spot.SpotImages
    // delete spot.Reviews
    // })
    // console.log(spotsList[0].SpotImages[0].previewImage)
    //    const allSpots = User.findAll();


    // spots = spotsList


    return res.json({spots,
        page, size
    })







})


router.post('/:spotId/images', validateImage, requireAuth, async (req, res, next) => {
    const {spotId} = req.params;
    const {url, preview} = req.body
    let spot = await Spot.findByPk(spotId)

    if (! spot) {
        res.statusCode = 404;
        return res.json({message: "Spot couldn't be found", statusCode: res.statusCode})
    }
    // console.log(spot.dataValues.ownerId)
    let currUser = req.user.id
    // console.log(currUser)
    let ownerId = spot.dataValues.ownerId;

    if (currUser !== ownerId) {
        res.statusCode = 403;
        return res.json({message: "You must be the owner of the spot to add a image", statusCode: res.statusCode})
    }
    const spotImage = await SpotImage.create({spotId, url, preview})

    return res.json({id: spotImage.id, url: spotImage.url, preview: spotImage.preview})

})


router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
    const {spotId} = req.params;
    const {review, stars} = req.body

    const userId = req.user.id
    const spot = await Spot.findByPk(spotId);
    if (! spot) {
        res.statusCode = 404;
        return res.json({"message": "Spot couldn't be found", "statusCode": res.statusCode})
    }
    const userReviewCheck = await Review.findAll({where: {
            userId
        }})
    userReviewCheck.forEach(review => { // console.log(spotId, review.spotId)
        if (review.spotId === Number(spotId)) {
            res.statusCode = 403;
            return res.json({"message": "User already has a review for this spot", "statusCode": res.statusCode})
        }
    })
   let spotIdNumber = Number(spotId)

    const newReview = await Review.create({review, stars, spotId: spotIdNumber, userId})
    res.statusCode = 201;
    return res.json(newReview)
})


router.post('/:spotId/bookings',  validateBookings, requireAuth, async (req, res, next) => {
    const {spotId} = req.params;
    const userId = req.user.id
    let errorChecker = true
    const spot = await Spot.findByPk(spotId)
    if (! spot) {
        res.statusCode = 404;
        return res.json({"message": "Spot couldn't be found", "statusCode": res.statusCode})
    }

    const spotParsed = spot.toJSON()
    const ownerId = spotParsed.ownerId

    if (userId === ownerId) {
        res.statusCode = 400;
        return res.json({"message": "You can not book a spot you own", "statusCode": res.statusCode})
    }


    const {startDate, endDate} = req.body
    // console.log(startDate, endDate)
    startDateParsed = startDate.split('-')
    endDateParsed = endDate.split('-')
    const newStart = new Date(startDateParsed[0], startDateParsed[1], startDateParsed[2])

    // console.log(newStart.toDateString(), 'newstart')
    const newStartExactTime = newStart.getTime()
    // console.log(newStart)
    const newEnd = new Date(endDateParsed[0], endDateParsed[1], endDateParsed[2])
    const newEndExactTime = newEnd.getTime()

    // console.log(typeof startDate,newStartExactTime,newEndExactTime)
    const bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })
    // console.log(bookings)

    if (newStartExactTime > newEndExactTime) {
        res.statusCode = 400;
        errorChecker = false;
        return res.json({
            "message": "Validation error",
            "statusCode": res.statusCode,
            "errors": [
             "endDate cannot be on or before startDate"
            ]
        })
    }


    bookings.forEach(booking => {

        if (booking.dataValues.startDate) { // console.log(booking.dataValues)
            const bookedStart = booking.dataValues.startDate.getTime()


            const bookedEnd = booking.dataValues.endDate.getTime()

            // console.log(bookedEnd,bookedStart, newStartExactTime)

            if(newStartExactTime <= bookedStart && newEndExactTime >= bookedEnd){
                errorChecker = false;
                res.statusCode = 403;
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": res.statusCode,
                    "errors": [
                       "Start date conflicts with an existing booking",
                     "End date conflicts with an existing booking"
                    ]
                })
            }
            if (newStartExactTime >= bookedStart && newEndExactTime <= bookedEnd) {
                errorChecker = false;
                res.statusCode = 403;
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": res.statusCode,
                    "errors": [
                       "Start date conflicts with an existing booking",
                     "End date conflicts with an existing booking"
                    ]
                })
            }


            if (newStartExactTime >= bookedStart && newStartExactTime<= bookedEnd){
                errorChecker = false;
                        res.statusCode = 403;
                      return res.json({
                        "message": "Sorry, this spot is already booked for the specified dates",
                        "statusCode": res.statusCode,
                        "errors": [
                        "Start date conflicts with an existing boosking"

                        ]
                    })


                    }

                    if(newEndExactTime >= bookedStart && newEndExactTime <= bookedEnd) {
                res.statusCode = 403;
                errorChecker = false;
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": res.statusCode,
                    "errors": [
                        "End date conflicts with an existing booking"
                    ]
                })


            }

        }
        // console.log(booking.dataValues.startDate,'in a booking')
    })
    // console.log(startDate,endDate)
    if( errorChecker === true){
        const confirmedNewBookings = await Booking.create({startDate: newStart, endDate: newEnd, spotId: Number(spotId), userId: userId})

        return res.json(confirmedNewBookings)
    }

});


// router.get('/',  async (req, res, next) => {

    // let {page , size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    // const where = {};
    // page = parseInt(page);
    // size = parseInt(size);
    // if (Number.isNaN(page)) page = 0;
    // if (Number.isNaN(size)) size = 20;
    // if(page > 10) page = 10;
    // if(size > 20) size = 20;


    // if(minLat){
    //     minLat =  Number(minLat);
    //     where.lat = {[Op.gte]: minLat}
    // }

    // if(maxLat){
    //     maxLat =  Number(maxLat);
    //     where.lat = { [Op.lte]: maxLat}
    // }


    // if(minLat && maxLat){
    //     where.lat =   {[Op.between]: [minLat, maxLat]}
    // }


    // if(minLng){
    //     minLng =  Number(minLng);
    //     where.lng = {[Op.gte]: minLng}
    // }

    // if(maxLng){
    //     maxLng =  Number(maxLng);
    //     where.lng = { [Op.lte]: maxLng}
    // }


    // if(minLng && maxLng){
    //     where.lng =   {[Op.between]: [minLng, maxLng]}
    // }


    // if(minPrice){
    //     minPrice =  Number(minPrice);
    //     where.price = {[Op.gte]:minPrice}
    // }

    // if(maxPrice){
    //    maxPrice =  Number(maxPrice);
    //     where.price = {[Op.lte] : maxPrice}
    // }
    // if(minPrice && maxPrice){
    //     where.Price =   {[Op.between]: [minPrice, maxPrice]}
    // }


    //    let spots = await Spot.findAll({
    //     where,
    // //     include: [{
    // //         model: Review,
    // //         attributes: ['stars']

    // //    },
    //     // {model: SpotImage}
    // // ],
    //    limit: size,
    //     offset: (page - 1) * size
    // });
    // if(!spots){
    //     return res.json({error:"no spots yet"})
    // }
    // // let spotsList = [];
    // // spots.forEach(spot => {
    // //     spotsList.push(spot.toJSON())
    // // })
    // // let avg = 0;
    // // let count = 0;
    // // spotsList.forEach(spot => {
    // //     spot.SpotImages.forEach(image => {
    // //         // console.log(image.url)
    // //         if(!image.preview){
    // //             spot.previewImage = "no preview image found"
    // //         }
    // //         else if(image.preview === true){
    // //             // console.log('in')
    // //             spot.previewImage = image.url
    // //         }
    // //     })
    // // // console.log(spot.Reviews)
    // // spot.Reviews.forEach(review => {
    // //     if(review.stars !== undefined){
    // //         count++
    // //         avg += Number(review.stars)
    // //     }
    // // })
    // //     if(!spot.previewImage){
    // //         spot.previewImage = "no preview image found"
    // //     }
    // //     if(count === 0){
    // //         spot.avgRating ="no reviews on this spot yet"
    // //     }
    // //     else {
    // //         spot.avgRating = avg / count;
    // //     }
    // //     avg = 0;
    // //     count = 0;
    // // // console.log(spotsList);
    // // delete spot.SpotImages
    // // delete spot.Reviews
    // // })
    // // console.log(spotsList[0].SpotImages[0].previewImage)
    // //    const allSpots = User.findAll();


    // // spots = spotsList
    //    return res.json({
    //         spots,
    //         page,
    //     size})



// })


router.post('/', requireAuth,
validateSpot,
async (req, res, next) => {


    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price

    } = req.body

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        // lat,
        // lng,
        name,
        description,
        price,
        ownerId: req.user.dataValues.id
    })

    res.statusCode = 201;
    return res.json(newSpot)
})


router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: ['stars']

            }, {
                model: SpotImage
            }
        ],
        where: {
            ownerId: req.user.dataValues.id
        }
    })


    let spotsList = spots

    // console.log(spotsList)

    spotsList.forEach(spot => {
        let avg = 0;
        let count = 0;
        //    console.log(spot.dataValues)
        spot.dataValues.Reviews.forEach(review => {
            if (review.stars !== undefined) { // console.log(count, 'in', review.stars)
                count++
                avg += Number(review.stars)
            }
        })


        spot.dataValues.SpotImages.forEach(image => {

            if (image.dataValues.preview === true) {
                spot.dataValues.previewImage = image.url
            } else {
                let none = "no preview image found"
                spot.dataValues.previewImage = none
            }
        })


        if (!spot.dataValues.previewImage) {
            let none = "no preview image found"
            spot.dataValues.previewImage = none
        }


        if (count === 0) {
            let avgRating = "no reviews on this spot yet"
            spot.dataValues.avgRating = avgRating
        } else {
            let avgRating = avg / count;
            spot.dataValues.avgRating = avgRating
        }
        delete spot.dataValues.SpotImages
        delete spot.dataValues.Reviews
    })


    delete spotsList.Reviews
    let Spots = spotsList
    return res.json({Spots})


});


router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const {spotId} = req.params
    updateSpot = await Spot.findByPk(spotId)

    // console.log(updateSpot.ownerId, 'owner Id')
    // console.log(req.user.dataValues.id)
    if (!updateSpot) {
        res.statusCode = 404;
        return res.json({"message": "Spot couldn't be found", "statusCode": res.statusCode})
    }
    if (updateSpot.ownerId === req.user.dataValues.id) {
        const {
            price,
            description,
            name,
            lng,
            lat,
            country,
            state,
            city,
            address
        } = req.body

        if (price) {
            updateSpot.price = price;
        }
        if (description) {
            updateSpot.description = description;
        }
        if (name) {
            updateSpot.name = name;
        }
        if (lng) {
            updateSpot.lng = lng;
        }
        if (lat) {
            updateSpot.lat = lat;
        }
        if (country) {
            updateSpot.country = country;
        }
        if (state) {
            updateSpot.state = state;
        }
        if (city) {
            updateSpot.city = city;
        }
        if (address) {
            updateSpot.address = address;
        }
        await updateSpot.save()

        // console.log(updateSpot)
        return res.json(updateSpot)
    }


    res.statusCode = 403;
    return res.json({error: "you do not have access to editing a spot you are not the owner of", statusCode: res.statusCode})


})


router.delete('/:id', requireAuth, async (req, res, next) => {
    const {id} = req.params;
    deleteSpot = await Spot.findByPk(id)
    if (!deleteSpot) {
        res.statusCode = 404;
        return res.json({"message": "Spot couldn't be found", "statusCode": res.statusCode})
    }
    // console.log(deleteSpot.ownerId)
    // console.log(req.user.id)
    if (deleteSpot.ownerId === req.user.id) {
        await deleteSpot.destroy();
        return res.json({message: "Successfully deleted", statusCode: res.statusCode})
    }


    res.statusCode = 403;
    return res.json({error: "you do not have access to editing a spot you are not the owner of", statusCode: res.statusCode})
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

router.get('/:spotId', async (req, res, next) => {
    const {spotId} = req.params;

    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: ['stars']

            }, {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            }, {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })

    if (! spot) {
        res.statusCode = 404
        return res.json({"message": "Spot couldn't be found", "statusCode": res.statusCode})
    }
    let avg = 0;
    let count = 0;
    let spotList = spot.toJSON()

    // console.log(spotList.Reviews)
    spotList.Reviews.forEach(review => { // console.log(review)
        if (review.stars !== undefined) {
            console.log(count, 'in')
            count++
            avg += Number(review.stars)
        }

    })

    // console.log(spotList.SpotImages)

    if (count === 0) {
        spotList.avgStarRating = "no reviews on this spot yet"
    } else {
        spotList.avgStarRating = avg / count;
    }

    // if(spot.SpotImages.image.preview === true){
    //     console.log('in image')
    //     spot.previewImage = image.url
    // }

    // delete spotList.SpotImages
    spotList.Owner = spotList.User;
    delete spotList.User;
    spotList.numReviews = count;
    delete spotList.Reviews;
    return res.json(spotList)
})


router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {spotId} = req.params;
    // console.log(spotId)
    // console.log(req.user.id)

    const userId = req.user.id;
    let Bookings = await Booking.findAll({
        attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt', 'id']
        },
        where: {
            spotId: spotId
        }


    })
    const spot = await Spot.findByPk(spotId)
    // console.log(spot.ownerId)
    if (! spot) {
        res.statusCode = 404;
        return res.json({"message": "Spot couldn't be found", "statusCode": res.statusCode})
    }

    const spotOwner = spot.ownerId
    if (spotOwner !== userId) {
        return res.json({Bookings})
    }
    let ownersBookingsInfo = await Booking.findAll({

        where: {
            spotId: spotId
        }

    })
    console.log('here')
    ownersBookingsInfo.forEach(booking => {
        console.log(booking.dataValues.userId)


    })

    for (let i = 0; i < ownersBookingsInfo.length; i++) {
        let currentBookingUserId = ownersBookingsInfo[i].dataValues.userId;
        let userInfo = await User.findByPk(currentBookingUserId, {
            attributes: ['id', 'firstName', 'lastName']
        });


        ownersBookingsInfo[i].dataValues.User = userInfo.dataValues;

    }

    console.log('here')
    Bookings = ownersBookingsInfo;
    // Bookings[0].User.push(owner)
    // console.log(Bookings[0])
    if (spotOwner === userId) {
        return res.json({Bookings})
    }

})


router.get('/:spotId/reviews', async (req, res, next) => {

    const {spotId} = req.params;
    console.log(spotId)

    let spotChecker = await Spot.findByPk(spotId);

    if(!spotChecker){
        res.statusCode = 404;
        return res.json({message: "Spot couldn't be found", statusCode: res.statusCode})
    }


    let reviews = await Review.findAll({

        where: {
            spotId: spotId
        }
    })





    let user
    let reviewImages
    for (let i = 0; i < reviews.length; i++) {

        let currReview = reviews[i];
        console.log(currReview.dataValues)
        let currUser = reviews[i].dataValues.userId
        // console.log(currReview)
        user = await User.findByPk(currUser, {
            attributes: ['id', 'firstName', 'lastName']
        })

        currReview.dataValues.User = user.dataValues
        // console.log(user.dataValues)

        reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: currReview.dataValues.id
            },
            attributes: ['id', 'url']
        })
        currReview.dataValues.ReviewImages = reviewImages

    }



    if (reviews.length === 0) {
        res.statusCode = 200;
        return res.json({message: "This spot has no reviews", statusCode: res.statusCode})
    }
    let Reviews = reviews
    return res.json({Reviews})
})


module.exports = router;
