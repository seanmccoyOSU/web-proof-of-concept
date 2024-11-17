const { Router } = require('express')
const { ValidationError } = require('sequelize')
const path = require('path')

const { User, UserClientFields, validateCredentials } = require('../models/user')

const { generateAuthToken, requireAuthentication } = require('../lib/auth')

const router = Router()

function verifyUserId(req, res, next) {
  console.log("user id check: " + req.user + " vs " + req.params.userId)
  if (req.user != req.params.userId) {
    res.status(403).send({
      error: "Not authorized to access the specified resource"
    })
  } else {
    next()
  }
}

/*
 * Route to login page
 */
router.get('/login', async function (req, res, next) {
    res.status(200).sendFile(path.join(__dirname, "../public/login.html"))
})

/*
 * Route to account page.
 */
router.get('/:userId', requireAuthentication, verifyUserId, async function (req, res, next) {
    try {
      const user = await User.findByPk(req.params.userId)
      if (user) {
        res.status(200).send({
          surveys: user.surveys
        }).sendFile(path.join(__dirname, "../public/account.html"))
      } else {
        next()
      }
    } catch (e) {
      next(e)
    }
  })


/*
 * Route to registration page
 */
router.get('/', async function (req, res, next) {
    res.status(200).sendFile(path.join(__dirname, "../public/register.html"))
})

/*
 * Route to register a new user.
 */
router.post('/', async function (req, res, next) {
    try {
        const user = await User.create(req.body, UserClientFields)
        res.status(201).send({ id: user.id })
        } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).send({ error: e.message })
        } else {
            next(e)
        }
    }
})

/*
 * Route to login.
 */
router.post('/login', async function (req, res, next) {
    try {
      const authenticated = await validateCredentials(req.body.name, req.body.password)
      if (authenticated) {
        const user = await User.findOne({ where: { name: req.body.name}})
        const token = generateAuthToken(user.id)
        res.status(200).send({
          token: token,
          navTo: path.join(__dirname, "..")
        })
      } else {
        res.status(401).send({
          error: "Invalid authentication credentials"
        })
      }
    } catch (e) {
      next(e)
    }
})
  
module.exports = router