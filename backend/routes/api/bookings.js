const express = require('express')
const router = express.Router();
const {Booking } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
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



router.put('/:bookingId',validateBookings, requireAuth, async (req ,res ,next) => {

const {bookingId} = req.params;
const {startDate, endDate} = req.body
    const updateBooking = await Booking.findByPk(bookingId)

    if(!updateBooking){
        res.statusCode = 404;
        res.json({
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
        res.json({

                "message": "You can only modify your bookings",
                "statusCode": res.statusCode

        })
    }
    const date = new Date();

    const currentEndDate = updateBooking.endDate
    if(currentEndDate.getTime() < date.getTime()){
        res.statusCode = 403;
        res.json({

                "message": "Past bookings can't be modified",
                "statusCode": res.statusCode

        })
    }
    let startDateNumber = new Date(startDate)
    let endDateNumber = new Date(endDate)
    if(startDateNumber.getTime() > endDateNumber.getTime()){
        res.statusCode = 400;
        res.json({
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

    allBookingsForSpot.forEach(booking => {
        const bookedStart = booking.dataValues.startDate.getTime()
        const bookedEnd = booking.dataValues.endDate.getTime()
        console.log(bookedEnd,bookedStart)
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

res.json(updateBooking)

})








module.exports = router;
