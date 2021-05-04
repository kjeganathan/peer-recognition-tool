const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Employee = require("../models/employee.model.js");
const Notification = require("../models/notification.model.js");

/**
 * @openapi
 * /notifications/new/{id}:
 *   post:
 *     description: Add a notification to the employee with the given ID
 *     parameters:
 *       -
 *          name: value
 *          in: body
 *          description: notification message
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.post('/new/:employeeId', async (req, res) => {
    // if (!req.isAuthenticated()) {
    //     res.status(401).json({ message: 'You are not logged in' });
    //     return;
    // }

    const employee = await Employee.findOne({ employeeId: req.params.employeeId });

    if (!employee){
        res.status(404).send('No employee with ID ${req.params.employeeId}');
        return;
    }


    // if (!('message' in req.body)) {
    //     res.status(422).send('Use format {"message": "notification text"}');
    //     return;
    // }

    const newNotification = new Notification({ message: req.body.message, arrivalTime: new Date()});
    await newNotification.save()
        .catch(error => res.status(400).send("Error: " + error));

    employee.activeNotifications.push(newNotification);
    await employee.save()
        .then(() => res.send("Notification created."))
        .catch(error => res.status(400).send("Error: " + error));

    res.status(201).send(newNotification);

});

// Handle GET request for notification
router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'You are not logged in' })
        return
    }


    let notifications = await Notification.find({ '_id': { $in: req.user.activeNotifications } });
    res.status(200).send({ notifications : notifications });

    // res.status(200).json(
    //     {
    //         notifications: [
    //             {
    //                 message: "Test notification message 0",
    //                 arrivalTime: new Date(),
    //                 recognitionID: 0
    //             },
    //             {
    //                 message: "Test notification message 1",
    //                 arrivalTime: new Date("2021-01-01T00:00:00"),
    //                 recognitionID: 1
    //             }
    //         ]
    //     }
    // );

})

router.delete('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ message: 'You are not logged in' })
        return
    }

    // FIXME: Uncomment these lines when line 38 is addressed
    // req.user.notifications = [];
    // await req.user.save();

    res.status(204);
})

module.exports = router;
