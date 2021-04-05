// This file contains functions and endpoints for working with notifications.
const express = require('express')
const mongoose = require('mongoose')

// Routers are used to split endpoints across multiple files.
const router = express.Router()

/**
 * @openapi
 * /notifications:
 *   get:
 *     description: Get notifications for a given employee
 *     responses:
 *       '200':
 *         description: A list of unread recognitions for a given employee.
 */
 router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ message: 'You are not logged in' })
        return
    }

    // While notification scheduler is WIP, send some test
    // notifications for frontend to test with
    res.status(200).send([
      {
          message:       'Test Notification 0',
          arrivalTime:   Date.now(),
          recognitionID: 0
      },
      {
          message:       'Test Notification 1',
          arrivalTime:   Date.parse('04 Dec 1995 00:12:00 GMT'),
          recognitionID: 1
      },
    ])

    // FIXME: Replace above placeholder data with production data below (works)
    // res.status(200).send(req.user.activeNotifications);
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
