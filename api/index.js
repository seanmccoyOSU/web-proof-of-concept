const { Router } = require('express')

const { ValidationError } = require('sequelize')
const path = require('path')

//const { User, UserClientFields, validateCredentials } = require('../models/user')

const { Survey, SurveyClientFields } = require('../models/survey')

const { generateAuthToken, requireAuthentication } = require('../lib/auth')


//const { User } = require('../models/user')

const usersRouter = require('./users')

const router = Router()

router.use('/users', usersRouter)

router.get('/surveys', async function(req,res,next) {
    res.status(200).sendFile(path.join(__dirname, "../public/createSurvey.html"))
})

router.post('/surveys', async function(req,res,next) {
    try {
        const survey = await Survey.create(req.body, SurveyClientFields)
        res.status(201).send({ id: survey.id })
    } catch (e) {
        if (e instanceof ValidationError) {
          res.status(400).send({ error: e.message })
        } else {
          next(e)
        }
    }
})

router.get('/', async function(req,res,next) {
    res.status(200).sendFile("index.html")
})

// router.get('/users', function(req,res,next) {
//     res.status(200).sendFile(path.join(__dirname, "../public/account.html"))
// })


module.exports = router