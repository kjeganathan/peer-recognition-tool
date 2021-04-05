// This file contains functions and endpoints for working with notifications.
const express = require('express')

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
    console.log("Test");// FIXME 
    res.status(200).send({message: 'placeholder'})
})

module.exports = router;
