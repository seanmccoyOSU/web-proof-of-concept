const { Router } = require('express')
const path = require('path')

const usersRouter = require('./users')

const router = Router()

router.use('/users', usersRouter)

router.get('/', function(req,res,next) {
    //res.status(200).sendFile(path.join(__dirname, "../public/index.html"))
    //res.status(200).sendFile("index.html", { root: "./public" })
    res.status(200).sendFile("index.html")
})

// router.get('/users', function(req,res,next) {
//     res.status(200).sendFile(path.join(__dirname, "../public/account.html"))
// })


module.exports = router