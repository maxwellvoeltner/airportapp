// getting the airplane model
const Airplane = require('../models/airplaneModel')
// getting mongoose
const mongoose = require('mongoose')

/*
These functions are associated w/ a unique route and request
*/

/*
associated w/ request: GET and route: '/api/airplanes/'
returns json objects of all of the airplanes in database
*/
const getAirplanes = async (req, res) => {

    // getting all airplanes in database in ascending order of when they were created
    const airplanes = await Airplane.find({}).sort({createdAt: -1})

    /*
    responding w/:
    status 200 = everything's good
    json(airplanes) = json objects of all airplanes in database
    */
    res.status(200).json(airplanes)
}

/*
associated w/ request: GET and route: '/api/airplanes/{airplane id}'
returns json object of airplane associated w/ id in database
*/
const getAirplane = async (req, res) => {

    // getting id of airplane from params of request
    const { id } = req.params

    // if the id is not a valid MongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {

        /*
        responding w/:
        status 404: something went wong
        json object of error message
        */
        // return because this function is over if this situation happens
        return res.status(404).json({error: 'No such airplane'})
    }

    // getting airplane from datbase
    const airplane = await Airplane.findById(id)

    // if airplane is null then there is no airplane with id from request
    if (!airplane) {

        /*
        responding w/:
        status 404: something went wong
        json object of error message
        */
        // return because this function is over if this situation happens
        return res.status(404).json({error: "No such airplane"})
    }

    /*
    responding w/:
    status 200 = everything's good
    json(airplane) = json object of airplane associated w/ id in database
    */
    res.status(200).json(airplane)
}

/*
associated w/ request: POST and route: '/api/airplanes/'
returns json object of airplane created and added to database
*/
const createAirplane = async (req, res) => {

    // getting the flight number, departure time, and arrival time from body of request
    const {arrivingFrom, arrivalFlight, arrivalTime, arrivalStatus, departingTo, departureFlight, departureTime, departureStatus, gate} = req.body

    /*
    let - cannot access varible before initialization
    empty fields array for keeping track of any empty fields during creation of airplane
    this is used for the front end to border the empty field(s) box(es) in red
    and output a message to the screen that there are empty fields
    */
    let emptyFields = []

    // if arriving from from is null (no arrival location was given)
    if (!arrivingFrom) {

        // add 'arrivingFrom' to empty fields
        emptyFields.push('arrivingFrom')
    }

    // if the arrival flight is null (no arrival flight was given)
    if (!arrivalFlight) {

        // add 'arrivalFlight' to empty fields
        emptyFields.push('arrivalFlight')
    }

    // if the arrival time is null (no arrival time was given)
    if (arrivalTime == null) {
        
        // add 'arrivalTime' to empty fields
        emptyFields.push('arrivalTime')
    }

    // if arrivalStatus to is null (no arrivalStatus time was given)
    if (!arrivalStatus) {

        // add 'arrivalStatus' to empty fields
        emptyFields.push('arrivalStatus')
    }

    // if the departure flight is null (no departure flight number was given)
    if (!departureFlight) {

        // add 'departureFlight' to empty fields
        emptyFields.push('departureFlight')
    }

    // if the departure time is null (no departure time was given)
    if (departureTime == null) {

        // add 'departureTime' to empty fields
        emptyFields.push('departureTime')
    }

    // if departing to is null (no departure location was given)
    if (!departingTo) {

        // add 'departingto' to empty fields
        emptyFields.push('departingTo')
    }

    // if departure status to is null (no departure status was given)
    if (!departureStatus) {

        // add 'departure status' to empty fields
        emptyFields.push('departureStatus')
    }

    // if gate to is null (no arrival time was given)
    if (!gate) {

        // add 'gate' to empty fields
        emptyFields.push('gate')
    }

    // if there is at least 1 empty field
    if (emptyFields.length > 0) {

        /*
        responding w/:
        status 400 = something went wrong
        json(error mesage) = json object of error message w/ empty fields
        */
        // return because this function is over if this situation happens
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // adding airplane to database
    try {

        // creating airplane json object with field values from params of requests
        const airplane = await Airplane.create({arrivingFrom, arrivalFlight, arrivalTime, arrivalStatus, departingTo, departureFlight, departureTime, departureStatus, gate})

        /*
        responding w/:
        status 200 = everything's good
        json(airplane) = json object of airplane created
        */
        res.status(200).json(airplane)
    
    //error case
    } catch (error) {

        /*
        responding w/:
        status 400 = something went wrong
        json(error mesage) = json object of error message
        */
        res.status(400).json({error: error.message})
    }
}

/*
associated w/ request: DELETE and route: '/api/airplanes/{airplane id}'
deletes airplane entry in database
*/
const deleteAirplane = async (req, res) => {

    // getting id from params of request
    const { id } = req.params

    // if the id is not a valid MongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {

        /*
        responding w/:
        status 404: something went wong
        json object of error message
        */
        // return because this function is over if this situation happens
        return res.status(404).json({error: 'No such airplane'})
    }

    // getting airplane and deleting airplane entry from database
    const airplane = await Airplane.findOneAndDelete({_id: id})

    // if airplane is null (no airplane in database w/ given id)
    if (!airplane) {

        /*
        responding w/:
        status 404: something went wong
        json object of error message
        */
        // return because this function is over if this situation happens
        return res.status(404).json({error: "No such airplane"})
    }

    /*
    responding w/:
    status 200 = everything's good
    json(airplane) = json object of airplane associated w/ id in database
    */
    res.status(200).json(airplane)
 }

//update a airplane
const updateAirplane = async (req, res) => {

    // getting id from params of request
    const { arrivefrom } = req.params

    /*
    getting airplane from database and updating airplane entry in database
    '...req.body' deconstructs the request body into the fields of the airplane
    so the function can update the fields of the airplane entry in database
    */
    const airplane = await Airplane.findOneAndUpdate({arrivingFrom: arrivefrom}, {
        ...req.body
    })

    // if airplane is null (no airplane in database w/ given id)
    if (!airplane) {

        /*
        responding w/:
        status 404: something went wong
        json object of error message
        */
        // return because this function is over if this situation happens
        return res.status(404).json({error: "No such airplane"})
    }

    /*
    responding w/:
    status 200 = everything's good
    json(airplane) = json object of airplane created
    */
    res.status(200).json(airplane)
}

// exporting the functions for the router to store with the associated requests/routes
module.exports = {
    getAirplanes,
    getAirplane,
    createAirplane,
    deleteAirplane,
    updateAirplane
}