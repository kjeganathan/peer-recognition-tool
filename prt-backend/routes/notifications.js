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
 * /notifications:
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

/**
 * @openapi
 * /notifications:
 *   delete:
 *     description: Delete all active notifications of the user
 *     responses:
 *       '204':
 *         description: Active notifications were successfully deleted
 */
router.delete('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ message: 'You are not logged in' })
        return
    }
    await Notification.deleteMany({ '_id': { $in: req.user.activeNotifications } })
        .catch(error => res.status(400).send("Error: " + error));
    req.user.activeNotifications = [];
    await req.user.save()        
        .then(() => res.send("Active notifications deleted."))
        .catch(error => res.status(400).send("Error: " + error));

    res.status(204);
})

module.exports = router;
