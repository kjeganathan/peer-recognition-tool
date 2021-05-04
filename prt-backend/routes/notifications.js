const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Employee = require("../models/employee.model.js");
const Notification = require("../models/notification.model.js");

/**
 * @openapi
 * /notifications/{id}:
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
router.post('/:employeeId', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'You are not logged in' });
        return;
    }

    const employee = await Employee.findOne({ employeeId: req.params.employeeId });

    if (!employee){
        res.status(404).send('No employee with ID ${req.params.employeeId}');
        return;
    }


    if (!('message' in req.body)) {
        res.status(422).send('Use format {"message": "notification text"}');
        return;
    }

    const newNotification = new Notification({ message: req.body.message, arrivalTime: new Date()});
    await newNotification.save()
        .catch(error => res.status(400).send("Error: " + error));

    employee.activeNotifications.push(newNotification);
    await employee.save()
        .then(() => res.send("Notification created."))
        .catch(error => res.status(400).send("Error: " + error));

    res.status(201).send(newNotification);

});

/**
 * @openapi
 * /values:
 *   get:
 *     description: Get all active notifications for the user
 *     responses:
 *       '200':
 *         description: A list of notification objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: Notification
 */
router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'You are not logged in' })
        return
    }


    const notifications = await Notification.find({ '_id': { $in: req.user.activeNotifications } });
    res.status(200).send({ notifications : notifications });

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
