const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

/**
 * @openapi
 * /values:
 *   get:
 *     description: Get all core values for user's company
 *     responses:
 *       '200':
 *         description: A list of core values as strings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ message: 'You are not logged in' })
        return
    }

    // TODO: Get company for req.user, return "values" list
    res.status(200).send({ values: ['WIP'] })
})

/**
 * @openapi
 * /values:
 *   post:
 *     description: Add a new core value to the user's company. Requires admin.
 *     parameters:
 *       -
 *          name: value
 *          in: body
 *          description: New core value to add
 *          required: true
 *          schema:
 *              type: object
 *              required:
 *                - value
 *              properties:
 *                value:
 *                  type: string
 *     responses:
 *       '201':
 *         description: Returns all core values for the company including the created one
 */
router.post('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({ message: 'You are not logged in' })
        return
    }

    const isAdmin = true; // Replace with actual check
    if (!isAdmin) {
        res.status(403).send({ message: 'Only admins can edit core values' })
        return
    }

    // Expected format:
    // { "value": "Text" }

    if (!('value' in req.body)) {
        res.status(422).send({ message: 'Use format {"value": "Value text"}' })
        return
    }

    // TODO: Add newValue to "values" field of current employee (req.user)'s
    // company
    const newValue = req.body.value;

    // TODO: Using the same company object as above, get the actual list of
    // updated values
    const updatedValuesList = [newValue];
    res.status(201).send({ values: updatedValuesList })
})

module.exports = router;
