const { Router } = require('express')
const path = require('path')

const router = Router()

router.get('/', function(req,res,next) {
    res.status(200).sendFile(path.join(__dirname, "../public/index.html"))
})

router.get('/users', function(req,res,next) {
    res.status(200).sendFile(path.join(__dirname, "../public/account.html"))
})


module.exports = router