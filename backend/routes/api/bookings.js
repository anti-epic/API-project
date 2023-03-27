const express = require('express')
const router = express.Router();
const {Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



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


router.get('/',  async (req ,res ,next) => {

})

router.get('/current', requireAuth,  async (req ,res ,next) => {

    const {id} = req.user

   let Bookings = await  Booking.findAll({
        where: {
            userId: id,

        },
        include: {

            model: Spot,
            attributes: {exclude:['createdAt', 'updatedAt', 'description']},



        },
    })


let spotsIds = []

    Bookings.forEach(booking => {


        spotsIds.push(booking.spotId)



    })


let Spots = [];
for(let i = 0; i < spotsIds.length; i++){
    let tempspotId = spotsIds[i]
Spots[i] = await Spot.findAll({
        where: {id: tempspotId},
        attributes: {exclude:['createdAt', 'updatedAt', 'description']},
        include: {model: SpotImage, attributes:  ['preview', 'url']}
    })
}


for(let i = 0; i < Bookings.length; i++){
    Bookings[i].dataValues.Spot = Spots[i][0];
    // console.log(Spots[i])


    if(Spots[i][0].SpotImages){


        Spots[i][0].SpotImages.forEach(image => {
        // console.log('init',typeof image.preview )
        // console.log(image.dataValues, 'init')
        // console.log(Bookings[i].dataValues.Spot.dataValues)

        if(image.dataValues.preview === false){
            Bookings[i].dataValues.Spot.dataValues.previewImage = 'No preview Image available'
        }
        else {
            Bookings[i].dataValues.Spot.dataValues.previewImage = image.url

        }
        // console.log(Spots[i][0].SpotImages)

    })
    if(!Bookings[i].dataValues.Spot.dataValues.previewImage){
        Bookings[i].dataValues.Spot.dataValues.previewImage = 'No preview Image available'
    }
    delete Spots[i][0].dataValues.SpotImages
}
}

//     console.log(Bookings)
//     if(!Bookings){
//         res.send(
//             "you have no bookings yet"
//         )
//     }

//     let bookingsList = [];
//     Bookings.forEach(booking => {
//         bookingsList.push(booking.toJSON())
//     })
//     bookingsList.forEach(booking => {


//  })
//  Bookings = bookingsList
//  console.log(Bookings, 'here')
    return res.json({
        Bookings,

    })

 })

router.put('/:bookingId',validateBookings, requireAuth, async (req ,res ,next) => {

const {bookingId} = req.params;
const {startDate, endDate} = req.body
    const updateBooking = await Booking.findByPk(bookingId)

    if(!updateBooking){
        res.statusCode = 404;
       return res.json({
            "message": "Booking couldn't be found",
            "statusCode": res.statusCode
          })
    }
    const  {spotId, userId} = updateBooking.toJSON()
    console.log(spotId, userId)
    const currentUser = req.user.id
    // console.log(currentUser, 'herer')
    if(userId !== currentUser){
        res.statusCode = 401;
       return res.json({

                "message": "You can only modify your bookings",
                "statusCode": res.statusCode

        })
    }
    const date = new Date();

    const currentEndDate = updateBooking.endDate
    if(currentEndDate.getTime() < date.getTime()){
        res.statusCode = 403;
      return  res.json({

                "message": "Past bookings can't be modified",
                "statusCode": res.statusCode

        })
    }
    let startDateNumber = new Date(startDate)
    let endDateNumber = new Date(endDate)
    if(startDateNumber.getTime() > endDateNumber.getTime()){
        res.statusCode = 400;
      return  res.json({
            "message": "Validation error",
            "statusCode": res.statusCode,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
        })
    }

    const allBookingsForSpot = await Booking.findAll({
        where: {
            spotId
        }


    })



    // if(!allBookingsForSpot){
    //     res.json({err:'no bookings here'})
    // }



    allBookingsForSpot.forEach(booking => {

        // console.log(bookedEnd,bookedStart)
        if(booking.dataValues.startDate){
            // console.log(booking.dataValues)
        const bookedStart = booking.dataValues.startDate.getTime()



        const bookedEnd = booking.dataValues.endDate.getTime()

        // console.log(bookedEnd,bookedStart, newStartExactTime)


        if(startDateNumber < bookedStart && endDateNumber > bookedEnd){
            res.statusCode = 403;
            return res.json({
              "message": "Sorry, this spot is already booked for the specified dates",
             "statusCode": res.statusCode,
             "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
             }})
        }



        if(startDateNumber >= bookedStart && startDateNumber <= bookedEnd){
            res.statusCode = 403;
          return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
           "statusCode": res.statusCode,
           "errors": {
            "startDate": "Start date conflicts with an existing booking"

           }})


        }

        if(endDateNumber >= bookedStart && endDateNumber <= bookedEnd){
            res.statusCode = 403;
            return res.json({
              "message": "Sorry, this spot is already booked for the specified dates",
              "statusCode": res.statusCode,
             "errors": {
               "endDate": "End date conflicts with an existing booking"
             }})



          }

    }
    })

    updateBooking.startDate = startDate;
    updateBooking.endDate = endDate;
    await updateBooking.save()

    // console.log(allBookingsForSpot)

return res.json(updateBooking)

})




router.delete('/:bookingId',requireAuth, async (req, res, next) => {
const {bookingId} = req.params;
console.log(bookingId);
console.log(req.user.id)
const deleteBooking = await Booking.findByPk(bookingId);
if(!deleteBooking){
    res.statusCode = 404;
   return res.json({
        "message": "Booking couldn't be found",
        "statusCode": res.statusCode
      })
}

const spotId = deleteBooking.dataValues.spotId
const spot = await Spot.findByPk(spotId);
const spotOwner = spot.dataValues.ownerId
const currentUser = req.user.id
const bookingUserId = deleteBooking.userId

// console.log(spotOwner, currentUser, bookingUserId)
if(bookingUserId !== currentUser && currentUser !== spotOwner){
    res.statusCode = 401;
  return  res.json({

            "message": "You can only delete your bookings / or if you are the owner of the spot",
            "statusCode": res.statusCode

    })

}
    const startDate = deleteBooking.startDate.getTime()
    const currentDate = new Date().getTime();
    // console.log(currentDate), 'HERE'
    if(startDate < currentDate){
        res.statusCode = 403;
      return  res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": res.statusCode
        })
    }



console.log(spotOwner, currentUser, deleteBooking.userId)
deleteBooking.destroy()
res.statusCode = 200;
return res.json({
    "message": "Successfully deleted",
    "statusCode": res.statusCode

})



})






router.post('/:spotId',  validateBookings, requireAuth, async (req, res, next) => {
    const {spotId} = req.params;
    const userId = req.user.id


    let err = {};
    err.errors = [];

    let errorChecker = true
    const spot = await Spot.findByPk(spotId)
    if (! spot) {
        // console.log(' in here')
        res.statusCode = 404;
        return res.json({"message": "Spot couldn't be found", "statusCode": res.statusCode})
    }

    const spotParsed = spot.toJSON()
    const ownerId = spotParsed.ownerId

    if (userId === ownerId) {
        // console.log(' in here')
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
        // console.log(' in here')
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

    for(let i = 0; i < bookings.length; i++) {
        let booking = bookings[i]


        if (booking.dataValues.startDate) { // console.log(booking.dataValues)
            const bookedStart = booking.dataValues.startDate.getTime()


            const bookedEnd = booking.dataValues.endDate.getTime()

            if(newStartExactTime <= bookedStart && newEndExactTime >= bookedEnd){
            errorChecker = false;
            console.log(' in here3')
            errorChecker = false;
            err.title = "Validation error";
            err.statusCode = 403;
            err.message = "Sorry, this booking wont work due to another exisiting booking being in the middle of your request";
            return next(err)
            }
            if (newStartExactTime >= bookedStart && newEndExactTime <= bookedEnd) {
                errorChecker = false;
                errorChecker = false;
                err.title = "Validation error";
                err.statusCode = 403;
                err.message = "the booking start and end date are in the middle of an existing booking";
                return next(err)
            }


            if (newStartExactTime >= bookedStart && newStartExactTime<= bookedEnd){
                errorChecker = false;
                console.log(' in here5')
                    errorChecker = false;
                    err.title = "Validation error";
                    err.statusCode = 403;
                    err.message = "this booking start date is in the middle of an existing booking";
                    return next(err)
                    }

                    if(newEndExactTime >= bookedStart && newEndExactTime <= bookedEnd) {
                res.statusCode = 403;
                errorChecker = false;
                err.title = "Validation error";
                err.statusCode = 403;
                err.message = "Sorry, this end date is in the middle of an existing booking";
                return next(err)
            }

        }

}

    if( errorChecker === true){
        console.log(' in here with true')
        const confirmedNewBookings = await Booking.create({startDate: newStart, endDate: newEnd, spotId: Number(spotId), userId: userId})
        res.statusCode = 200;
        res.json({
            "message": "booking confirmed"
        })
        return
    }

    res.statusCode = 403;
    errorChecker = false;
    err.title = "Validation error";
    err.statusCode = 403;
    err.message = "Unkown Error, please retry";
    return next(err)

});








module.exports = router;
