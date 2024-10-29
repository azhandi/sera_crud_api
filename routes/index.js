const express = require('express')
const router = express.Router()

const employeeRoutes = require('./employee')

router.get('/', (req, res) => {
    res.send('Hello, World!')
})

router.use('/employee', employeeRoutes)

module.exports = router
